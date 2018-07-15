/* eslint no-console: off */
const cli = require('commander');
const chalk = require('chalk');
const init = require('./cli/init');
const createNote = require('./cli/create');
const save = require('./cli/save');
const load = require('./cli/load');

// Init
cli
  .command('init')
  .action(() => {
    init().then(() => {
      console.log(chalk.green('Minota initialized'));
    });
  });

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

// Load
cli
  .command('load')
  .option('-l --last [last]')
  .action(({ last }) => {
    if (last) {
      load({ last }).then(() => {
        console.log(chalk.green('Notes loaded'));
      });
    }
    if (!last) {
      console.log(chalk.yellow('You should specify load options'));
    }
  });

// Parse command line arguments
cli.parse(process.argv);

// Show help if no command supplied
if (!process.argv.slice(2).length) {
  cli.help(text => chalk.gray(text));
}
