import commander from 'commander';
import {getName, getWorkstationType} from "../common";
import {$workstation, WORKSTATION_TYPES_MAP} from "../../services/workstation/workstation.service";
import chalk from "chalk";

export default {
  install(program: commander.Command) {
    program
      .command('new [name]')
      .description('create an octopus workstation')
      .option('-t, --type <type>', 'Specifies the type of workstation')
      .action(async (name, options) => {

        if (!name) name = await getName('workstation');

        if (!options.type) options.type = await getWorkstationType();
        if (!(WORKSTATION_TYPES_MAP as any)[options.type]) {
          return console.log(
            chalk.bold(chalk.red('You can only choose one of the following three frameworks:\n')) +
            chalk.yellowBright('vue\n') +
            chalk.yellowBright('angular\n') +
            chalk.yellowBright('react')
          );
        }

        $workstation.create(name, options.type);
      });
  }
}
