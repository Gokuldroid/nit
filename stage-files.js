#!/usr/bin/env node
const lsBranch = require('./utils/ls-branch');
const execCommand = require('./utils/exec-command');
const select = require('./utils/select');
const promptCheckbox = require('./utils/prompt-checkbox');

const stageFiles = async (argv) => {
  let result = await promptCheckbox({ message: 'Select files to commit', choices: ['app/js', 'model/demo.js', 'hello.js'] });
  console.log(result);
};

module.exports = (yargsBuilder) => {
  return yargsBuilder.command('stage', 'Stage, un-stage files', {}, stageFiles);
}