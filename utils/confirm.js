const prompts = require('prompts');

module.exports = async (message, initialValue = false) => {
 let response = await prompts({
    type: 'confirm',
    name: 'value',
    message,
    initial: initialValue
  });
  return response.value;
};
 