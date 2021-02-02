import commander from 'commander';
import chalk from 'chalk';
import {$workstation} from '../../services/workstation/workstation.service';
import {$project} from '../../services/project/project.service';
import {selectProject} from '../common';

export default {
  install(program: commander.Command) {
    program
      .command(`serve [project]`)
      .description(chalk.yellowBright('Serves a project in development mode'))
      .action(async (project: string) => {
        await $workstation.syncConfig();

        if (!project) project = await selectProject();

        return $project.serve(project);
      });
  }
}
