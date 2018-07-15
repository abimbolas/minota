const { assert } = require('chai');
const storage = require('./index');

describe('Storage', () => {
  it('should exist', () => {
    assert.isOk(storage);
  });

  it('should return appropriate storage if specified config', () => {
    const config = {
      type: 'file',
      file: {
        path: '/my-path'
      }
    };
    const customStorage = storage.config(config);
    assert.equal(customStorage.type, 'file');
  });

  it('should throw error without path', () => {
    const config = {
      type: 'file',
      file: {
        path: ''
      }
    };
    try {
      const customStorage = storage.config(config);
    } catch (error) {
      assert.isOk(error);
    }
  });
});
