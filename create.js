// const uuid = require('uuid/v1');
const uuid = require('small-uuid').create;
const moment = require('moment');
const fs = require('fs-extra-promise');
const yaml = require('js-yaml');

// Generate note title if not specified
const defaultTitle = uuid();

// Create file with default config and empty content
function createDefaultNote () {
  return {
    content: 'Enter your text here',
    config: {
      date: moment().format()
    }
  }
}

function createNoteFile (params) {
  const note = (params && params.note) || createDefaultNote();
  // const yamlConfig = yaml.safeDump(note.config);
  const fileContents = [
    // '---',
    // (yamlConfig.slice(-1) === '\n' ? yamlConfig.slice(0, -1) : yamlConfig),
    // '---',
    note.content
  ].join('\n');

  fs.outputFileAsync(`./${defaultTitle}.md`, fileContents)
    .then(function () {
      console.log(`Note '${defaultTitle}.md' created successfully`);
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = createNoteFile;
