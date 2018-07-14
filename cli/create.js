const moment = require('moment');
const randomString = require('small-uuid');
const fs = require('fs-extra-promise');
const stringifyNotes = require('../other/md').stringify;

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
  const name = `note.${randomString.create()}`;
  const filename = `./${name}.md`;
  return fs
    .outputFileAsync(filename, stringifyNotes([note]))
    .then(() => ({ note, filename }));
}

module.exports = createNote;
