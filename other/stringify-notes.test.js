import assert from 'assert';

function stringifyNotes(notes) {
  return notes;
}

describe('Stringify notes into text', () => {
  it('should just be', () => {
    assert.equal(typeof stringifyNotes, 'function');
  });
});
