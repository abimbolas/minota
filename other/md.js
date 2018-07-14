// import yaml from 'js-yaml';
const yaml = require('js-yaml');

// According to YAML spec, '---' divide parts of document (config, content),
// and '...' divide whole documents (notes)

function parseNotes(text) {
  return text.trim()
    .split(/^\.\.\.\s*$/gm)
    .map(part => part.trim())
    .filter(part => part)
    .map((raw) => {
      const parts = raw
        .split(/^---\s*$/gm)
        .map(part => part.trim());
      const content = parts.slice(-1)[0];
      const config = parts.slice(-2, -1)[0];
      return {
        config: config && yaml.safeLoad(config),
        content: content || '',
      };
    });
}

function stringifyNotes(notes) {
  return notes.map((note) => {
    const config = note.config ? `---\n${yaml.safeDump(note.config)}---\n` : '';
    const content = note.content || '';
    return `${config}${content}`;
  }).join('\n...\n');
}

module.exports = {
  parse: parseNotes,
  stringify: stringifyNotes,
};
