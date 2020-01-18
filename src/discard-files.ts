#!/usr/bin/env node

import { Argv } from 'yargs';
import Repo from './git/repo';
import multiSelect from './utils/ui/multi-select';
import File from './git/file';
import confirm from './utils/ui/confirm';
import { toChoices } from './utils/ui/selectable';

const discardFiles = async (): Promise<void> => {
  const unStagedFiles = await new Repo().unStagedFiles();

  if (unStagedFiles.length == 0) {
    console.log('Branch is clean!');
    return;
  }

  const selectedFiles = await multiSelect<File>({
    message: 'Select files to discard',
    choices: toChoices(unStagedFiles),
  });

  if (
    selectedFiles.length != 0 &&
    (await confirm(`Are you sure want to discard ${selectedFiles.map((file) => `${file.name} `)} files?`))
  ) {
    for (const file of selectedFiles) {
      // eslint-disable-next-line no-await-in-loop
      await file.discard();
    }
  }
};

export default (yargsBuilder: Argv): Argv => {
  return yargsBuilder.command('discard', 'Discard files', {}, discardFiles);
};
