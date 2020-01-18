import { bold, green } from 'ansi-colors';
import { prompt } from 'enquirer';
import { match } from 'fuzzy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T>(options: any): Promise<T[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await prompt<any>(
    Object.assign(
      {
        name: 'value',
        type: 'AutoComplete',
        multiple: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        suggest: (input: string, choices: any[]) => {
          return choices.filter((choice) => match(input, choice.message));
        },
        actions: {
          ctrl: {
            a: 'a',
          },
        },
        footer: `\n${bold('Space ')}${green('- toggle selection, ')}${bold('Enter ')}${green('- proceed, ')}${bold(
          'Type ',
        )}${green('- fuzzy search, ')}${bold('Ctrl+A ')}${green('- select all')}`,
      },
      options,
    ),
  );
  return response;
};
