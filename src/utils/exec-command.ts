import cp from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function execCommand(cmd: string, opts: any): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, opts, (err, stdout) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(stdout.toString());
      }
    });
  });
}
