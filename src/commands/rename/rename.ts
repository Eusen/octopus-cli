import commander from 'commander';
import {ExtraTypes, getName, getExtraType} from '../common';
import {$workstation} from '../../services/workstation/workstation.service';

export default {
  install(program: commander.Command) {
    program
      .command('rename [type] [name]')
      .description('Removes an extras from your workstation')
      .action(async (type: ExtraTypes, name) => {
        const resp = await $workstation.syncConfig();

        if (!resp) return;
        if (!type) type = await getExtraType();
        if (!name) name = await getName(name);

        switch (type) {
          case 'project':
            return $workstation.renameProject(name);
        }
      });
  }
}
