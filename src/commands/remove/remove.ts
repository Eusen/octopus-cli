import commander from 'commander';
import chalk from 'chalk';
import {$workstation} from '../../services/workstation/workstation.service';
import {ExtraTypes, getName, getExtraType} from '../common';

export default {
  install(program: commander.Command) {
    program
      .command('remove [type] [name]')
      .description(chalk.yellowBright('Removes an extras from your workstation'))
      .action(async (type: ExtraTypes, name) => {
        await $workstation.syncConfig();

        if (!type) type = await getExtraType();
        if (!name) name = await getName(name);

        switch (type) {
          case 'project':
            return $workstation.removeProject(name);
        }
      });
  }
}
