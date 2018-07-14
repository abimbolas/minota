const moment = require('moment');
const smallUUID = require('small-uuid');
const fs = require('fs-extra-promise');
const stringifyNotes = require('./other/md').stringify;

function newNote() {
  return {
    config: {
      date: moment().format(),
    },
    content: '(Enter your text here)',
  };
}

function createNote() {
  const note = newNote();
  const name = `note.${smallUUID.create()}`;
  const filename = `./${name}.md`;
  return fs
    .outputFileAsync(filename, stringifyNotes([note]))
    .then(() => Promise.resolve({ note, filename }));
}

module.exports = createNote;
