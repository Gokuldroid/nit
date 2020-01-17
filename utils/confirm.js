const { Confirm } = require('enquirer');

module.exports = async (message, initialValue = false) => {
 let response = await new Confirm({
    type: 'confirm',
    name: 'value',
    message,
    initial: initialValue
  }).run();
  return response;
};
 