import execCommand from '../utils/exec-command';
import os from 'os';
import Branch from './branch';
import File from './file';

export default class Repo {
  dir: string;
  constructor(dir = '.') {
    this.dir = dir;
  }

  async branches(remote = false): Promise<Branch[]> {
    let cmd = 'git branch';
    if (remote) {
      cmd += ' -r';
    }
    const output = await this.execCommand(cmd);
    return this.parseBranches(output).map((branch) => {
      return new Branch(this, branch, remote);
    });
  }

  async modifiedFiles(): Promise<File[]> {
    const gitStatus = await this.execCommand('git status -s -u');
    if (gitStatus.length == 0) {
      return [];
    }
    const fileAndStatuses = gitStatus.split(os.EOL);
    const stagedFiles = await this.stagedFileNames();

    return fileAndStatuses.map((fileAndStatus: string) => {
      const action = fileAndStatus.trim().charAt(0);
      const name = fileAndStatus
        .trim()
        .substring(2)
        .trim();
      return new File(this, name, stagedFiles.includes(name), action);
    });
  }

  async unStagedFiles(): Promise<File[]> {
    return (await this.modifiedFiles()).filter((file) => !file.isStaged);
  }

  private parseBranches(str: string): string[] {
    if (!str) return [];
    const lines = str.trim().split(os.EOL);
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().replace(/^\*\s*/, '');
      res.push(line);
    }
    return res;
  }

  async execCommand(cmd: string): Promise<string> {
    console.log(cmd);
    return (await execCommand(cmd, { cwd: this.dir })).trim();
  }

  private async stagedFileNames(): Promise<string[]> {
    const files = await this.execCommand('git diff --name-only --cached');
    if (files.length == 0) {
      return [];
    } else {
      return files.split(os.EOL);
    }
  }
}
