import commander from 'commander';
import chalk from 'chalk';

export default {
  install(program: commander.Command) {
    program
      .command(`start`)
      .description(chalk.yellowBright(''))
      .action(async (project: string) => {
      });
  }
}
