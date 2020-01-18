import execCommand from '../utils/exec-command';
import Repo from './repo';
import colors from 'ansi-colors';
import Selectable from '../utils/ui/selectable';

const actionColorMap: { [key: string]: string } = {
  A: colors.green('A'),
  C: colors.magenta('C'),
  D: colors.red('D'),
  M: colors.blue('M'),
  R: colors.yellow('R'),
  T: colors.yellow('T'),
  U: colors.white('U'),
  X: colors.red('X'),
  B: colors.red('B'),
};

export default class File implements Selectable {
  name: string;
  isStaged: boolean;
  repo: Repo;
  private _action!: string;

  constructor(repo: Repo, name: string, isStaged: boolean, action: string) {
    this.repo = repo;
    this.name = name;
    this.isStaged = isStaged;
    this.action = action;
  }

  async discard(): Promise<string> {
    if (this.isUnTracked) {
      return await execCommand(`git clean -f -q -- ${this.name}`, { cwd: this.repo.dir });
    } else {
      return await execCommand(`git checkout -q -- ${this.name}`, { cwd: this.repo.dir });
    }
  }

  async stage(): Promise<string> {
    return await execCommand(`git add ${this.name}`, { cwd: this.repo.dir });
  }

  get isUnTracked(): boolean {
    return this.action == 'U';
  }

  set action(action: string) {
    this._action = action == '?' ? 'U' : action;
  }

  get action(): string {
    return this._action;
  }

  get coloredAction(): string {
    return actionColorMap[this.action];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toChoice(): any {
    return {
      name: this,
      message: `${this.coloredAction} ${this.name}`,
    };
  }
}
