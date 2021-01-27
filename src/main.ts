import {program} from 'commander';
import chalk from "chalk";
import leven from "leven";
import packageJson from '../package.json';
import AddCommand from './commands/add/add';
import RenameCommand from './commands/rename/rename';
import RemoveCommand from './commands/remove/remove';
import NewCommand from './commands/new/new';
import InfoCommand from './commands/info/info';

export class Main {
  static start() {
    const main = new Main();

    main.setup().then(() => {
      main.run();
    }, err => {
      console.log(chalk.red(err));
    });
  }

  /**
   * Some `@vue/cli` codes are used for reference
   */
  suggestCommands(unknownCommand = '') {
    const availableCommands = program.commands.map(cmd => cmd.name());

    let suggestion = '';

    availableCommands.forEach(cmd => {
      const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd;
      }
    })

    if (suggestion) {
      console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
    } else {
      console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(unknownCommand)}.`));
    }
  }

  setup() {
    return new Promise<boolean>((resolve, reject) => {
      program
        .name('ops')
        .version(`${packageJson.name} ${packageJson.version}`)
        .usage('<command> [options]');

      // install commands
      NewCommand.install(program);
      AddCommand.install(program);
      RenameCommand.install(program);
      RemoveCommand.install(program);
      InfoCommand.install(program);

      // output help information on unknown commands
      program
        .action(() => {
          const cmd = program.args[0];
          if (!cmd) return;
          if (cmd === 'help') return program.outputHelp();

          this.suggestCommands(cmd);
        });

      // add some useful info on help
      program
        .on('--help', () => {
          console.log();
          console.log(`  Run ${chalk.cyan(`ops <command> --help`)} for detailed usage of given command.`);
          console.log();
        });

      resolve(true);
    })
  }

  run() {
    program.parse();

    if (!process.argv.slice(2).length) {
      program.outputHelp();
    }
  }
}

Main.start();
