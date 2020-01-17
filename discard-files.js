#!/usr/bin/env node
const execCommand = require('./utils/exec-command');
const promptMultiSelect = require('./utils/multi-select');
const os = require('os');
const actionColorMap = require('./constants/action-color-map');
const confirm = require('./utils/confirm');


const getStagedFiles = async () => {
  let files = await execCommand('git diff --name-only --cached');
  return files.trim().split(os.EOL);
}

const getUnStagedFiles = async () => {
  let files = await execCommand('git status -s -u');
  let stagedFiles = await getStagedFiles();

  files = files.trim().split(os.EOL);
  let options = files.filter((file) => file && file.length != 0 && !stagedFiles.includes(file)).map((file) => {
    let action = file.trim().charAt(0);
    let name = file.trim().substring(2).trim();
    return {
      name: { name, action },
      message: actionColorMap(action) + " " + name
    }
  });
  return options;
}

const discardFiles = async (argv) => {
  let modifiedFiles = await getUnStagedFiles();

  if (modifiedFiles.length == 0) {
    console.log('Branch is clean!');
    return;
  }

  let result = await promptMultiSelect({
    message: 'Select files to discard',
    choices: modifiedFiles
  });

  if (result.length != 0 && await confirm(`Are you sure want to discard ${result} files?`)) {
    let trackedFiles = [];
    let untrackedFiles = [];

    result.forEach((fileStatus) => {
      if(fileStatus.action == '?') {
        untrackedFiles.push(fileStatus.name);
      } else {
        trackedFiles.push(fileStatus.name);
      }
    });

    if (trackedFiles.length != 0) {
      await execCommand('git checkout -q -- ' + trackedFiles.reduce((current, file) => current + ' ' + file), '');
    }

    if (untrackedFiles.length != 0) {
      await execCommand('git clean -f -q -- ' + untrackedFiles.reduce((current, file) => current + ' ' + file), '');
    }
  }
};

module.exports = (yargsBuilder) => {
  return yargsBuilder.command('discard', 'Discard files', discardFiles);
}