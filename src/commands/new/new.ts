import commander from 'commander';
import chalk from 'chalk';
import {throwError} from '../../utils';
import {getName, getWorkstationType} from '../common';
import {$workstation, WORKSTATION_TYPES_MAP} from '../../services/workstation/workstation.service';

export default {
  install(program: commander.Command) {
    program
      .command('new [name]')
      .description(chalk.yellowBright('Create a new workstation'))
      .option('-t, --type <type>', 'Specifies the type of workstation')
      .action(async (name, options) => {

        if (!name) name = await getName('workstation');

        if (!options.type) options.type = await getWorkstationType();
        if (!(WORKSTATION_TYPES_MAP as any)[options.type]) {
          throwError('You can only choose one of the following three frameworks:');
          Object.keys(WORKSTATION_TYPES_MAP).forEach(type => console.log(chalk.yellowBright(type)));
          return process.exit(0);
        }

        await $workstation.create(name, options.type);
      });
  }
}
