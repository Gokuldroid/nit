import { prompt } from 'enquirer';

export default async (message: string, initialValue = false): Promise<boolean> => {
  const response = await prompt<boolean>({
    type: 'confirm',
    name: 'value',
    message,
    initial: initialValue,
  });
  return response;
};
