import commander from 'commander';
import chalk from 'chalk';
import {$workstation} from '../../services/workstation/workstation.service';
import {$project} from '../../services/project/project.service';
import {selectProject} from '../common';

export default {
  install(program: commander.Command) {
    program
        .command(`build [project]`)
        .description(chalk.yellowBright('Build a project in production mode.'))
        .action(async (project: string) => {
          await $workstation.syncConfig();

          if (!project) project = await selectProject();

          return $project.build(project);
        });
  }
}
