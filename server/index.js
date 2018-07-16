const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const storage = require('../storage');
const config = require('../cli/config');

const server = express();

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../ui')));

// Get last note
server.get('/api/last', (req, res) => storage
  .config(config.storage)
  .get({ last: true })
  .then(notes => res.send(notes)));

// Save note
server.post('/api/content/:id', (req, res) => storage
  .config(config.storage)
  .post({ notes: Array.isArray(req.body) ? req.body : [req.body] })
  .then(() => res.send([req.body])));

// Redirect all non api requests to the index
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui', 'index.html'));
});

server.listen(9876, () => {
  console.log('Server started at http://localhost:9876');
});
