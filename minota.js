const cli = require('commander');
const chalk = require('chalk');
const create = require('./create');
const save = require('./save');

// Create
cli
  .command('create')
  .action(() => {
    create();
  });

// Save
cli
  .command('save')
  .option('-f --file [file]')
  .action(({ file }) => {
    if (file && file !== true) {
      save({ file });
    }
  });

// Parse command line arguments
cli.parse(process.argv);

// Show help if no command supplied
if (!process.argv.slice(2).length) {
  cli.help(text => chalk.gray(text));
}
