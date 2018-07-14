/* eslint-env node, mocha */
const { assert } = require('chai');
const os = require('os');
const parseNotes = require('./md').parse;

describe('Parse text into note object(s)', () => {
  it('should treat just text as text', () => {
    const text = 'my text';
    const notes = parseNotes(text);
    assert.equal(notes.length, 1);
    assert.equal(notes[0].content, text);
  });

  it('omit empty notes when lots of them', () => {
    const text = '...\n...\r\n...\r\n  \n...';
    const notes = parseNotes(text);
    assert.equal(notes.length, 0);
  });

  it('omit empty notes in single', () => {
    const text = '...';
    const notes = parseNotes(text);
    assert.equal(notes.length, 0);
  });

  it('should handle OS-specific eol', () => {
    const text = 'hi\n...\r\nhello';
    const notes = parseNotes(text);
    assert.equal(notes[0].content, 'hi');
    assert.equal(notes[1].content, 'hello');
  });

  it('should not split on inline ellipsis', () => {
    const text = 'hi... My name is';
    const notes = parseNotes(text);
    assert.equal(notes.length, 1);
  });

  it('should find config', () => {
    const text = '---\r\nid: 5\n---\nHello ';
    const notes = parseNotes(text);
    assert.equal(notes.length, 1);
    assert.equal(notes[0].content, 'Hello');
    assert.equal(notes[0].config.id, 5);
  });

  it('should parse two notes', () => {
    const text = '---\nid: 6\n---\n\nHi Guys\n...\r\n---\nid: 100\n---\nAnother one';
    const notes = parseNotes(text);
    assert.equal(notes.length, 2);
    assert.equal(notes[0].config.id, 6);
    assert.equal(notes[1].config.id, 100);
  });

  it('should parse two notes with trailing end markers', () => {
    const text = '...\n---\nid: 6\n---\n\nHi Guys\n...\r\n---\nid: 100\n---\nAnother one\n...';
    const notes = parseNotes(text);
    assert.equal(notes.length, 2);
    assert.equal(notes[0].config.id, 6);
    assert.equal(notes[1].config.id, 100);
  });

  it('should parse notes without configs', () => {
    const text = [
      '---',
      'Hello',
      '...',
      '---',
      'Other hello',
    ].join(os.EOL);
    const notes = parseNotes(text);
    assert.equal(notes.length, 2);
    assert.equal(notes[0].content, 'Hello');
    assert.equal(notes[1].content, 'Other hello');
    assert.isNotOk(notes[0].config);
    assert.isNotOk(notes[1].config);
  });

  it('should parse notes without configs and config markers', () => {
    const text = [
      '',
      'Hello',
      '',
      '...',
      '',
      'Other hello',
    ].join(os.EOL);
    const notes = parseNotes(text);
    assert.equal(notes.length, 2);
    assert.equal(notes[0].content, 'Hello');
    assert.equal(notes[1].content, 'Other hello');
    assert.isNotOk(notes[0].config);
    assert.isNotOk(notes[1].config);
  });

  it('should do not parse empty note', () => {
    const text = [''].join(os.EOL);
    const notes = parseNotes(text);
    assert.equal(notes.length, 0);
  });

  it('should parse empty note if config present', () => {
    const text = [
      '---',
      'id: 5',
      '---',
      '...',
    ].join(os.EOL);
    const notes = parseNotes(text);
    assert.equal(notes.length, 1);
    assert.equal(notes[0].content, '');
    assert.equal(notes[0].config.id, 5);
  });
});
