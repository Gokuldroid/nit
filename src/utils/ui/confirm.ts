import { prompt } from 'enquirer';

export default async (message: string, initialValue = false): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await prompt<any>({
    type: 'confirm',
    name: 'value',
    message,
    initial: initialValue,
  });
  return response.value;
};
