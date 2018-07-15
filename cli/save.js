const uuid = require('uuid/v1');
const fs = require('fs-extra-promise');
const md = require('../other/md');

const storage = {
  post(rawNotes) {
    const config = JSON.parse(fs.readFileSync('./minota.json', 'utf8'));
    const notes = rawNotes.map((rawNote) => {
      const note = rawNote;
      note.config.id = note.config.id || uuid();
      return note;
    });

    if (config.storage.type === 'file') {
      // Save notes
      notes.forEach((note) => {
        fs.outputFileAsync(
          `${config.storage.file.path}/content/${note.config.id}`,
          md.stringify([note]),
        );
      });
      // Save pointer to last note
      fs.outputFileAsync(
        `${config.storage.file.path}/last-content`,
        `${notes.slice(-1)[0].config.id}`,
      );
    }

    return new Promise((resolve) => {
      resolve(notes);
    });
  },
};

function saveNotes(params) {
  if (params.file) {
    // read notes
    fs.readFileAsync(`./${params.file}`, 'utf8')
      // read and parse notes
      .then(contents => md.parse(contents))
      // save to storage
      .then(rawNotes => storage.post(rawNotes))
      // update focused
      .then((notes) => {
        fs.outputFileAsync(`./${params.file}`, md.stringify(notes));
      });
  }
}

module.exports = saveNotes;
