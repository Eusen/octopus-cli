import commander from 'commander';

export default {
  install(program: commander.Command) {
    program
      .command('new <name>', 'Adds an extras to your project')
      .action((name) => {
        console.log('add', name);
      });
  }
}
