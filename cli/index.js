/* eslint no-console: off */
const cli = require('commander');
const chalk = require('chalk');
const config = require('./config');
const init = require('./init');
const create = require('./create');
const save = require('./save');
const load = require('./load');

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
    create().then(() => {
      console.log(chalk.green('Note created'));
    });
  });

// Save
cli
  .command('save')
  .option('-f --file [file]')
  .action(({ file }) => {
    if (file && file !== true) {
      save({ file }, config.storage).then(() => {
        console.log(chalk.green('Notes saved'));
      });
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
      load({ last }, config.storage).then(() => {
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
