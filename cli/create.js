const moment = require('moment');
const randomString = require('small-uuid');
const fs = require('fs-extra-promise');
const md = require('../other/md');

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
    .outputFileAsync(filename, md.stringify(note))
    .then(() => ({ note, filename }));
}

module.exports = createNote;
