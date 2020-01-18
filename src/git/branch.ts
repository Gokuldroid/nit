import execCommand from '../utils/exec-command';
import Repo from './repo';
import Selectable from '../utils/ui/selectable';

export default class Branch implements Selectable {
  name: string;
  isRemote: boolean;
  repo: Repo;
  constructor(repo: Repo, name: string, isRemote: boolean) {
    this.name = name;
    this.isRemote = isRemote;
    this.repo = repo;
  }
  async delete(): Promise<string> {
    return await execCommand(`git branch -D ${this.name}`, { cwd: this.repo.dir });
  }

  async checkout(): Promise<string> {
    if (this.isRemote) {
      return await execCommand(`git checkout -t ${this.name}`, { cwd: this.repo.dir });
    } else {
      return await execCommand(`git checkout ${this.name}`, { cwd: this.repo.dir });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toChoice(): any {
    return {
      name: this,
      message: this.name,
    };
  }
}
