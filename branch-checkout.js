#!/usr/bin/env node
const lsBranch = require('./utils/ls-branch');
const execCommand = require('./utils/exec-command');
const select = require('./utils/select');


const checkoutBranch = async (argv) => {
  if (argv.remote) {
    let remoteBranches = await lsBranch('.', { remote: true});
    let branchesToCheckout = await select({ choices: remoteBranches, message: 'Select branch to checkout' });
    if (branchesToCheckout != null){
      await execCommand(`git checkout -t ${branchesToCheckout}`);
    }
  } else {
    let localBranches = await lsBranch('.');
    branchesToCheckout = await select({ choices: localBranches, message: 'Select branch to checkout' });
    if (branchesToCheckout != null){
      await execCommand(`git checkout ${branchesToCheckout}`);
    }
  }
};

module.exports = (yargsBuilder) => {
  return yargsBuilder.command('co', 'Checkout branch', {
    remote: {
      alias: 'r',
      describe: 'Checkout remote branch'
    }
  }, checkoutBranch);
}