import commander from 'commander';
import {$workstation} from '../../services/workstation/workstation.service';
import {ExtraTypes, getName, getExtraType} from '../common';

export default {
  install(program: commander.Command) {
    program
      .command('add [type] [name]')
      .description('Adds an extras to your workstation')
      .action(async (type: ExtraTypes, name) => {
        const errMsg = await $workstation.syncConfig();

        if (errMsg) return console.log(errMsg);
        if (!type) type = await getExtraType();
        if (!name) name = await getName(name);

        switch (type) {
          case 'project':
            return $workstation.addProject(name);
        }
      });
  }
}
