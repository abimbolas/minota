/* eslint-env node, mocha */
const { assert } = require('chai');
const stringifyNotes = require('./md').stringify;

describe('Stringify notes into text', () => {
  it('should stringify just text if no config and one note', () => {
    const notes = [
      { content: 'Hello' },
    ];
    const text = stringifyNotes(notes);
    assert.equal(text, 'Hello');
  });

  it('should stringify two notes', () => {
    const notes = [
      { content: 'Hello' },
      { content: 'Hi all' },
    ];
    const text = stringifyNotes(notes);
    assert.equal(text, 'Hello\n...\nHi all');
  });

  it('should stringify with configs', () => {
    const notes = [
      { content: 'Hello', config: { id: 6, draft: true, date: 'Jul' } },
      { content: 'No-config' },
    ];
    const text = stringifyNotes(notes);
    assert.equal(text, '---\nid: 6\ndraft: true\ndate: Jul\n---\nHello\n...\nNo-config');
  });
});
