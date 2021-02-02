import {spawn} from 'child_process';
import chalk from 'chalk';
import * as readline from 'readline';
import packageJson from '../../package.json';

export function exec(cmd: string) {
  return new Promise<any>((resolve, reject) => {
    const _process = spawn(cmd, {
      shell: true,
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    _process.addListener('error', (err: Error) => reject(err));
    _process.addListener('exit', (code: number | null, signal: NodeJS.Signals | null) => resolve({code, signal}));
  });
}


export function throwError(message: string, exit = false) {
  console.log(chalk.bold(chalk.red(message)));
  exit && process.exit(0);
}

export function getTitle() {
  return chalk.blueBright(`Octopus CLI v${packageJson.version}`);
}

export function cls(title = getTitle()) {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) console.log(title);
  }
}
