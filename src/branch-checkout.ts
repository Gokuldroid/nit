#!/usr/bin/env node

import select from './utils/ui/select';
import { Arguments, Argv } from 'yargs';
import Repo from './git/repo';
import Branch from './git/branch';
import { toChoices } from './utils/ui/selectable';

const checkoutBranch = async (argv: Arguments): Promise<string | null> => {
  const repo = new Repo();
  const branches = await repo.branches(argv.remote as boolean);
  const branchesToCheckout = await select<Branch>({
    choices: toChoices(branches),
    message: 'Select branch to checkout',
  });
  if (branchesToCheckout != null) {
    return branchesToCheckout.checkout();
  }
  return null;
};

export default (yargsBuilder: Argv): Argv => {
  return yargsBuilder
    .command(
      'checkout',
      'Checkout branch',
      {
        remote: {
          alias: 'r',
          describe: 'Checkout remote branch',
        },
      },
      checkoutBranch,
    )
    .alias('checkout', 'co');
};
