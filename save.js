// We got directed to note, which need to be saved
const note = '';

// We should have default storage
// Default storage type is file
// Default storage parameter for file is path, which
// is by default '.'
// Other storage type could be ftp or db,
// which have other parameters (hostname, for example)
// with default values.
const storage = {
  type: 'file',
  file: {
    path: ('.' || '/Users/antivitla/Dropbox/Notes'),
    _content: '/content'
  }
};
