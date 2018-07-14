const uuid = require('uuid/v1');
const fs = require('fs-extra-promise');
const md = require('../other/md');

const db = {
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

function saveNote(params) {
  if (params.file) {
    fs.readFileAsync(`./${params.file}`, 'utf8')
      .then(contents => md.parse(contents))
      .then(rawNotes => db.post(rawNotes))
      .then((notes) => {
        // Overwrite with new id from db
        fs.outputFileAsync(`./${params.file}`, md.stringify(notes));
      });
  }
}

module.exports = saveNote;
