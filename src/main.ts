import {program} from 'commander';
import packageJson from '../package.json';
import AddCommand from './commands/add/add';
import RenameCommand from './commands/rename/rename';
import RemoveCommand from './commands/remove/remove';

export class Main {
  setup() {
    program
        .version(`${packageJson.name} ${packageJson.version}`)
        .usage('<command> [options]');

    AddCommand.install(program);
    RenameCommand.install(program);
    RemoveCommand.install(program);

    return this;
  }

  run() {
    program.parse();
  }
}

new Main().setup().run();
