const FileStorage = require('./file');

const StorageTypes = {
  file: FileStorage,
};

const storage = {
  config(config) {
    return new StorageTypes[config.type](config.file);
  },
};

module.exports = storage;
