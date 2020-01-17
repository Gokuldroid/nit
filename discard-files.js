#!/usr/bin/env node
const execCommand = require('./utils/exec-command');
const promptMultiSelect = require('./utils/multi-select');
const os = require('os');
const actionColorMap = require('./constants/action-color-map');
const confirm = require('./utils/confirm');

const getUnStagedFiles = async () => {
  let files = await execCommand('git diff --name-only');
  files = files.trim().split(os.EOL);
  let options = files.filter((file) => file && file.length != 0).map((file) => {
    let action = file.trim().charAt(0);
    let name = file.trim().substring(0).trim();
    return {
      name: name,
      value: name,
      message: actionColorMap(action) + " " + name
    }
  });

  let deletedFiles = await execCommand('git ls-files -d');
  deletedFiles = deletedFiles.trim().split(os.EOL);
  let deletedFilesOptions = deletedFiles.filter((file) => file && file.length != 0).map((file) => {
    return {
      name: file,
      value: file,
      message: actionColorMap('D') + " " + file
    }
  });

  return [...options, ...deletedFilesOptions];
}

const discardFiles = async (argv) => {
  let modifiedFiles = await getUnStagedFiles();

  if(modifiedFiles.length == 0) {
    console.log('Branch is clean!');
    return;
  }

  let result = await promptMultiSelect({
    message: 'Select files to discard',
    choices: modifiedFiles
  });

  if (result.length != 0 && await confirm(`Are you sure want to discard ${result} files?`)) {
    await execCommand('git checkout -- ' + result.reduce((current, file) => current + ' ' + file), '');
  }
};

module.exports = (yargsBuilder) => {
  return yargsBuilder.command('discard', 'Discard files', discardFiles);
}