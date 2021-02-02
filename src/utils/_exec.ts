import {spawn} from 'child_process';
import chalk from "chalk";

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
