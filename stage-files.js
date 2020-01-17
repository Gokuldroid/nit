#!/usr/bin/env node
const execCommand = require('./utils/exec-command');
const promptMultiSelect = require('./utils/multi-select');
const os = require('os');
const colors = require('ansi-colors');

const actionColorMap = {
  "A": colors.green('A'),
  "C": colors.magenta('C'),
  "D": colors.red('D'),
  "M": colors.blue('M'),
  "R": colors.yellow('R'),
  "T": colors.yellow('T'),
  "U": colors.white('U'),
  "X": colors.red('X'),
  "B": colors.red('B')
}

const getStagedFiles = async () => {
  let files = await execCommand('git diff --name-only --cached');
  return files.trim().split(os.EOL);
}

const getModifiedFiles = async () => {
  let files = await execCommand('git status -s');
  files = files.trim().split(os.EOL);
  let options = files.filter((file) => file && file.length != 0).map((file) => {
    let action = file.trim().charAt(0);
    let name = file.trim().substring(2).trim();
    return {
      name: name,
      value: name,
      message: actionColorMap[action] + " " + name
    }
  });
  return options;
}

const stageFiles = async (argv) => {
  let modifiedFiles = await getModifiedFiles();

  if(modifiedFiles.length == 0) {
    console.log('Branch is clean!');
    return;
  }

  let stagedFiles = await getStagedFiles();
  let initialValues = [];
  modifiedFiles.forEach((value, index) => {
    if (stagedFiles.includes(value.name)) {
      initialValues.push(index);
    }
  });

  let result = await promptMultiSelect({
    message: 'Select files to stage',
    choices: modifiedFiles,
    initial: initialValues
  });

  await execCommand('git reset');
  if (result.length != 0) {
    await execCommand('git add ' + result.reduce((current, file) => current + ' ' + file), '');
  }
};

module.exports = (yargsBuilder) => {
  return yargsBuilder.command('add', 'Stage files', stageFiles)
    .alias('add', 'a');
}