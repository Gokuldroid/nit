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
    return await this.repo.execCommand(`git branch -D ${this.name}`);
  }

  async checkout(): Promise<string> {
    if (this.isRemote) {
      return await this.repo.execCommand(`git checkout -t ${this.name}`);
    } else {
      return await this.repo.execCommand(`git checkout ${this.name}`);
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
