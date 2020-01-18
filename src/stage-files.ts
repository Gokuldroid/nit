import { Argv } from 'yargs';
import Repo from './git/repo';
import multiSelect from './utils/ui/multi-select';
import File from './git/file';
import { toChoices } from './utils/ui/selectable';
import execCommand from './utils/exec-command';

const stageFiles = async (): Promise<void> => {
  const modifiedFiles = await new Repo().modifiedFiles();

  if (modifiedFiles.length == 0) {
    console.log('Branch is clean!');
    return;
  }

  const initialValues: number[] = [];
  modifiedFiles.forEach((modifiedFile, index) => {
    if (modifiedFile.isStaged) {
      initialValues.push(index);
    }
  });

  const selectedFiles = await multiSelect<File>({
    message: 'Select files to stage',
    choices: toChoices(modifiedFiles),
    initial: initialValues,
  });

  await execCommand('git reset', { cwd: '.' });
  if (selectedFiles.length != 0) {
    for (const file of selectedFiles) {
      // eslint-disable-next-line no-await-in-loop
      await file.stage();
    }
  }
};

export default (yargsBuilder: Argv): Argv => {
  return yargsBuilder.command('add', 'Stage files', stageFiles);
};
