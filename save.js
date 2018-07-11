const uuid = require('uuid/v1');
// const moment = require('moment');
const fs = require('fs-extra-promise');
const yaml = require('js-yaml');

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

fs.readFileAsync('./my-note.md', 'utf8')
  .then(lines => {
    console.log(lines);
    const notes = parseNotes(lines);
    const savedNote = putToStorage(notes[0]);
    syncNote('./my-note.md', savedNote);
  });

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
    console.log(parts);
    return {
      content: parts.slice(-1)[0].trim(),
    }
  });
}

function putToStorage (note) {
  if (storage.type === 'file') {
    const id = uuid();

    fs.outputFileAsync(`${storage.file.path}/content/${id}.md`, [
      '---',
      `id: ${note.id}`,
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
    fs.outputFileAsync(`${storage.file.path}/last-content`, `${id}.md`);

    return {
      config: {
        id: id
      },
      content: note.content
    };
  }
}
