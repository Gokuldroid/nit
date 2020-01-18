#!/usr/bin/env node
import multiSelect from './utils/ui/multi-select';
import select from './utils/ui/select';
import confirm from './utils/ui/confirm';
import { Arguments, Argv } from 'yargs';
import Repo from './git/repo';
import Branch from './git/branch';

const deleteBranch = async (argv: Arguments): Promise<void> => {
  const repo = new Repo();

  const branchChoices = (await repo.branches()).map((branch) => branch.toChoice());

  let branchesToDelete: Branch[];
  if (argv.multiple) {
    branchesToDelete = await multiSelect<Branch>({ choices: branchChoices, message: 'Select branches to delete' });
  } else {
    const branchToDelete = await select<Branch>({ choices: branchChoices, message: 'Select branch to delete' });
    if (branchToDelete == null) {
      return;
    }
    branchesToDelete = [branchToDelete];
  }

  if (branchesToDelete.length == 0) {
    return;
  }

  if (await confirm(`Are you sure want to delete ${branchesToDelete} branches?`)) {
    for (let index = 0; index < branchesToDelete.length; index++) {
      const branchToDelete = branchesToDelete[index];
      // eslint-disable-next-line no-await-in-loop
      await branchToDelete.delete();
    }
  }
};

export default (yargsBuilder: Argv): Argv => {
  return yargsBuilder
    .command(
      'delete',
      'Delete branch',
      {
        remote: {
          alias: 'r',
          describe: 'Delete remote branch',
        },
        multiple: {
          alias: 'm',
          describe: 'Delete multiple branch at once',
        },
      },
      deleteBranch,
    )
    .alias('delete', 'del');
};
