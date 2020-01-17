const { AutoComplete } = require('enquirer');
const fuzzy = require('fuzzy');

module.exports = async (options) => {
  const response = await new AutoComplete(Object.assign({
    name: 'value',
    suggest: (input, choices) => {
      return choices.filter((choice) => fuzzy.match(input, choice.message));
    }
  }, options)).run();
  return response;
};