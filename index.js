#!/usr/bin/env node
const chalk = require("chalk");
const figlet = require("figlet");
const program = require('commander');
const pkg = require('./package.json');
const getJoke = require('./util/getJoke');
const spinner = require('./util/spinner.json');
const Ora = require('ora');
const spinnerDiscardingStdin = new Ora({
	text: 'Loading joke',
	spinner
});
spinnerDiscardingStdin.start()
program
  .version(pkg.version)
  .description('Joke of the day - Display a random joke');

  program
  .action(() => {
   getJoke()
    .then((joke) => {
      spinnerDiscardingStdin.stop();
      console.log(
        chalk.blue(figlet.textSync('Joke Of The Day', { horizontalLayout: "small" }))
      );
      let question = null;
      let answer = null;
      joke = joke.split('?');
      if(joke.length >1) {
        question = joke[0];
        answer = joke[1];
      }
      if(question && answer && answer.length > 2) {
        console.log(chalk.green(`Question - ${question} ?`));
        console.log(chalk.blue(`Answer - ${answer}`));        
      }else {
        console.log(chalk.green(`Joke - ${joke}`));
      }    });
  });

program.parse(process.argv);