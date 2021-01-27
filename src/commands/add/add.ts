import commander from 'commander';
import {$workstation} from '../../services/workstation/workstation.service';
import {ExtraTypes, getExtraName, getExtraType} from '../common';

export default {
  install(program: commander.Command) {
    program
      .command('add [type] [name]')
      .description('Adds an extras to your workstation')
      .action(async (type: ExtraTypes, name) => {
        if (!type) type = await getExtraType();
        if (!name) name = await getExtraName(name);

        switch (type) {
          case 'project':
            return $workstation.addProject(name);
        }
      });
  }
}
