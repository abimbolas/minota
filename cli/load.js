const fs = require('fs-extra-promise');
const md = require('../other/md');

const storage = {
  get(params) {
    const config = JSON.parse(fs.readFileSync('./minota.json', 'utf8'));
    if (config.storage.type === 'file') {
      if (params.last === true) {
        return fs
          .readFileAsync(`${config.storage.file.path}/last-content`, 'utf8')
          .then(id => fs.readFileAsync(
            `${config.storage.file.path}/content/${id}`,
            'utf8',
          ))
          .then(raw => md.parse(raw));
      }
    }
    return Promise.reject(new Error('500'));
  },
};

function loadNotes(params) {
  return storage
    .get(params)
    .then(notes => Promise.all(
      notes.map(note => fs.outputFileAsync(
        `./note.${note.config.id}.md`,
        md.stringify(note),
      )),
    ));
}

module.exports = loadNotes;
