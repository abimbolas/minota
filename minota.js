/* eslint no-console: off */
const cli = require('commander');
const chalk = require('chalk');
const save = require('./cli/save');
const createNote = require('./cli/create');
const init = require('./cli/init');

// Create
cli
  .command('create')
  .action(() => {
    createNote().then(() => {
      console.log(chalk.green('Note created'));
    });
  });

// Save
cli
  .command('save')
  .option('-f --file [file]')
  .action(({ file }) => {
    if (file && file !== true) {
      save({ file });
    }
    if (!file) {
      console.log(chalk.yellow('You should specify filename with \'--file\' option'));
    }
  });

// Init
cli
  .command('init')
  .action(() => {
    init().then(() => {
      console.log(chalk.green('Minota initialized'));
    });
  });

// Parse command line arguments
cli.parse(process.argv);

// Show help if no command supplied
if (!process.argv.slice(2).length) {
  cli.help(text => chalk.gray(text));
}
