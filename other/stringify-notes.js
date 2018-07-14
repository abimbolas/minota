import yaml from 'js-yaml';

// According to YAML spec, '---' divide parts of document (config, content),
// and '...' divide whole documents (notes)
function stringifyNotes(notes) {
  return notes.map((note) => {
    const config = note.config ? `---\n${yaml.safeDump(note.config)}---\n` : '';
    const content = note.content || '';
    return `${config}${content}`;
  }).join('\n...\n');
}

export default stringifyNotes;
