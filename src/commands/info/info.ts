import commander from 'commander';
import chalk from 'chalk';

export default {
  install(program: commander.Command) {
    program
      .command('info')
      .description('Print debugging information about your environment')
      .action((cmd) => {
        console.log(chalk.bold('\nEnvironment Info:'))
        require('envinfo').run(
          {
            System: ['OS', 'CPU'],
            Binaries: ['Node', 'Yarn', 'npm'],
            Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
            npmPackages: '/**/{typescript/}',
            npmGlobalPackages: ['@octopus/cli']
          },
          {
            showNotFound: true,
            duplicates: true,
            fullTree: true
          }
        ).then(console.log)
      })
  }
}
