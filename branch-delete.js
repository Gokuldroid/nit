#!/usr/bin/env node
const lsBranch = require('./utils/ls-branch');
const execCommand = require('./utils/exec-command');
const multiSelect = require('./utils/multi-select');
const select = require('./utils/select');
const confirm = require('./utils/confirm');

const deleteBranch = async (argv) => {
  const localBranches = await lsBranch('.');

  let branchesToDelete;
  if (argv.multiple) {
    branchesToDelete = await multiSelect({ choices: localBranches, message: 'Select branches to delete' });
  } else {
    branchToDelete = await select({ choices: localBranches, message: 'Select branch to delete' });
    if (branchToDelete == null || branchToDelete.length == 0) {
      return;
    }
    branchesToDelete = [branchToDelete]
  }

  if (branchesToDelete.length == 0) {
    return;
  }

  if (await confirm(`Are you sure want to delete ${branchesToDelete} branches?`)) {
    for (let index = 0; index < branchesToDelete.length; index++) {
      const element = branchesToDelete[index];
      console.log('Deleting branch : ' + element);
      // await execCommand(`git branch -D ${element}`);
    }
  }
};

module.exports = (yargsBuilder) => {
  return yargsBuilder.command('delete', 'Delete branch', {
    remote: {
      alias: 'r',
      describe: 'Delete remote branch'
    },
    multiple: {
      alias: 'm',
      describe: 'Delete multiple branch at once'
    }
  }, deleteBranch)
  .alias('delete', 'del');
}