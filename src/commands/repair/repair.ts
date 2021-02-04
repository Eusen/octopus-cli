import commander from 'commander';
import chalk from 'chalk';
import {$workstation} from '../../services/workstation/workstation.service';

export default {
  install(program: commander.Command) {
    program
      .command(`repair`)
      .description(chalk.yellowBright('Repair workstation multi support'))
      .action(async () => {
        await $workstation.syncConfig();
        $workstation.repair();
        console.log(`✨ Successfully~`);
      });
  }
}
