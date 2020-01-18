#!/usr/bin/env node
import yargs from 'yargs';
import branchDelete from './branch-delete';
import branchCheckout from './branch-checkout';
import stageFiles from './stage-files';
import discardFiles from './discard-files';

const yargsBuilder = yargs
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('h', 'help');

branchDelete(yargsBuilder);
branchCheckout(yargsBuilder);
stageFiles(yargsBuilder);
discardFiles(yargsBuilder);

yargsBuilder.demandCommand(1, 'You need at least one command');

yargsBuilder.argv;
