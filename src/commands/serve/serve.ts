import commander from 'commander';
import {selectProject} from '../common';
import {$workstation} from '../../services/workstation/workstation.service';
import {$project} from '../../services/project/project.service';

export default {
  install(program: commander.Command) {
    program
      .command('serve [project]')
      .description('Removes an extras from your workstation')
      .action(async (project: string) => {
        const resp = await $workstation.syncConfig();

        if (!resp) return;
        if (!project) project = await selectProject();

        return $project.serve(project);
      });
  }
}
