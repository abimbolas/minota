const uuid = require('uuid/v1');
// const moment = require('moment');
const fs = require('fs-extra-promise');
const yaml = require('js-yaml');
const program = require('commander');
const chalk = require('chalk');

// We got directed to note, which need to be saved
const notefile = 'my-note.md';

// We should have default storage
// Default storage type is file
// Default storage parameter for file is path, which
// is by default '.'
// Other storage type could be ftp or db,
// which have other parameters (hostname, for example)
// with default values.
const storage = {
  type: 'file',
  file: {
    path: '/Users/antivitla/Dropbox/Notes'
  }
};



function syncNote (path, savedNote) {
  const yamlConfig = yaml.safeDump(savedNote.config);
  const fileContents = [
    '---',
    (yamlConfig.slice(-1) === '\n' ? yamlConfig.slice(0, -1) : yamlConfig),
    '---',
    savedNote.content
  ].join('\n');

  fs.outputFileAsync(path, fileContents)
    .then(function () {
      console.log(`Note '${path}' updated successfully`);
    })
    .catch(error => {
      console.log(error);
    });
}

function parseNotes (notes) {
  return notes.split('...').filter(i => i).map(raw => {
    const parts = raw.split('---').filter(i => i);
    const config = parts.slice(-2,-1)[0] && parts.slice(-2,-1)[0].trim();
    const content = parts.slice(-1)[0] && parts.slice(-1)[0].trim();
    const note = {
      config: config ? yaml.safeLoad(config) : {},
      content: content || ''
    };
    console.log(chalk.white.bgGreen('PARSE NOTES'), note);
    return note;
  });
}

function putToStorage (note) {
  if (storage.type === 'file') {
    console.log(chalk.bgYellow('Store'), note);
    note.config.id = note.config.id || uuid();

    fs.outputFileAsync(`${storage.file.path}/content/${note.config.id}.md`, [
      '---',
      `id: ${note.config.id}`,
      '---',
      note.content.trim()
    ].join('\n'))
      .then(() => {
        console.log('Saved!')
      })
      .catch(error => {
        console.log(error);
      });

    // Last saved
    fs.outputFileAsync(`${storage.file.path}/last-content`, `${note.config.id}.md`);

    return note;
  }
}

// program
//   .option('-f, --file [file]')
//   .parse(process.argv);
//
// if (program.file) {
// }

function saveNote (params) {
  if (params.file) {
    const filename = `./${params.file}`;
    fs.readFileAsync(filename, 'utf8')
    .then(lines => {
      const note = parseNotes(lines)[0];
      // let id = params.file.split('.md')[0];
      // note.id = note.id || id;
      console.log(chalk.white.bgBlue('save'), JSON.stringify(note, null, '  '));
      const savedNote = putToStorage(note);
      syncNote(filename, savedNote);
    });
  }
}

module.exports = saveNote
