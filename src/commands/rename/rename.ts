import commander from 'commander';
import chalk from 'chalk';
import {ExtraTypes, getName, getExtraType, selectProject} from '../common';
import {$workstation} from '../../services/workstation/workstation.service';

export default {
  install(program: commander.Command) {
    program
      .command('rename [type] [old-name] [new-name]')
      .description(chalk.yellowBright('Renames an extras from your workstation'))
      .action(async (type: ExtraTypes, oldName: string, newName: string) => {
        await $workstation.syncConfig();

        if (!type) type = await getExtraType();
        if (!oldName) oldName = await selectProject();
        if (!newName) newName = await getName(newName, true);

        switch (type) {
          case 'project':
            return $workstation.renameProject(oldName, newName);
        }
      });
  }
}
