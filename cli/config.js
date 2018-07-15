const fs = require('fs-extra-promise');

const config = JSON.parse(fs.readFileSync('./minota.json', 'utf8'));

module.exports = config;
