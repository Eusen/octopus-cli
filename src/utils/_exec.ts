import {spawn} from 'child_process';

export function exec(cmd: string) {
  spawn(cmd, {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true,
  });
}
