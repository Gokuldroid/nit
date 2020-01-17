const { prompt } = require('enquirer');


module.exports = async (options) => {
  let result = await prompt(Object.assign({
    name: 'value',
    radio: true
  }, options));
  return result.run();
};