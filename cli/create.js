const moment = require('moment');
const uuid = require('uuid/v1');
const fs = require('fs-extra-promise');
const md = require('../other/md');

function createNote() {
  const note = {
    config: {
      id: uuid(),
      date: moment().format(),
    },
    content: '(Enter your text here)',
  };
  return fs.outputFileAsync(`./note.${note.config.id}.md`, md.stringify(note));
}

module.exports = createNote;
