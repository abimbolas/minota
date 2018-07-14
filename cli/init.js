const fs = require('fs-extra-promise');

function createDefaultConfig() {
  return {
    storage: {
      type: 'file',
      file: {
        path: '',
      },
    },
  };
}

function init() {
  const config = createDefaultConfig();
  return fs
    .outputFileAsync('./minota.json', JSON.stringify(config, null, '  '));
}

module.exports = init;
