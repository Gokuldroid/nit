#!/usr/bin/env node
const yargs = require('yargs');
const branchDelete = require('./branch-delete');
const branchCheckout = require('./branch-checkout');
const stageFiles = require('./stage-files');
const discardFiles = require('./discard-files');

let yargsBuilder = yargs
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('h', 'help')
  
branchDelete(yargsBuilder);
branchCheckout(yargsBuilder);
stageFiles(yargsBuilder);
discardFiles(yargsBuilder);

yargsBuilder.demandCommand(1, 'You need at least one command');

yargsBuilder.argv