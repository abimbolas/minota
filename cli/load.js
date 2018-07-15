const fs = require('fs-extra-promise');
const md = require('../other/md');
const storage = require('../storage');

function loadNotes(params, config) {
  return storage
    .config(config)
    .get(params)
    .then(notes => Promise.all(
      notes.map(note => fs.outputFileAsync(
        `./note.${note.config.id}.md`,
        md.stringify(note),
      )),
    ));
}

module.exports = loadNotes;
