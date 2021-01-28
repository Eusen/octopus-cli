import {spawn} from 'child_process';

export function exec(cmd: string) {
  return new Promise<any>((resolve, reject) => {
    const _process = spawn(cmd, {
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: true,
    });

    _process.addListener("error", (err: Error) => reject(err));
    _process.addListener("exit", (code: number | null, signal: NodeJS.Signals | null) => resolve({code, signal}));
  });
}
