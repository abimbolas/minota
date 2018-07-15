const fs = require('fs-extra-promise');
const uuid = require('uuid/v1');
const md = require('../other/md');

class FileStorage {
  constructor({ path }) {
    if (!path) {
      throw new Error('FileStorage constructor: should be path to storage');
    }
    this.type = 'file';
    this.path = path;
  }

  get(params) {
    if (params.last === true) {
      return fs
        .readFileAsync(`${this.path}/last`, 'utf8')
        .then(id => fs.readFileAsync(
          `${this.path}/content/${id}`,
          'utf8',
        ))
        .then(raw => md.parse(raw));
    }
    return Promise.reject(new Error('Storage.get: no params specified'));
  }

  post(params) {
    const notes = params.notes.map((paramNote) => {
      const note = paramNote;
      note.config.id = note.config.id || uuid();
      return note;
    });

    // Save notes
    notes.forEach((note) => {
      fs.outputFileAsync(
        `${this.path}/content/${note.config.id}`,
        md.stringify([note]),
      );
    });

    // Save pointer to last note
    fs.outputFileAsync(
      `${this.path}/last`,
      `${notes.slice(-1)[0].config.id}`,
    );

    return new Promise((resolve) => {
      resolve(notes);
    });
  }
}

module.exports = FileStorage;
