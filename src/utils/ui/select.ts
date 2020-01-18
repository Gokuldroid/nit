import { bold, green } from 'ansi-colors';
import { prompt } from 'enquirer';
import { match } from 'fuzzy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T>(options: any): Promise<T | null> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await prompt<any>(
    Object.assign(
      {
        name: 'value',
        type: 'AutoComplete',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        suggest: (input: string, choices: any[]) => {
          return choices.filter((choice) => match(input, choice.message));
        },
        footer: `\n${bold('Enter ')}${green('- proceed, ')}${bold('Type ')}${green(' - to fuzzy search')}`,
      },
      options,
    ),
  );
  return response;
};
