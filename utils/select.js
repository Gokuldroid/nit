const { AutoComplete } = require('enquirer');
const fuzzy = require('fuzzy');
const colors = require('ansi-colors');

module.exports = async (options) => {
  const response = await new AutoComplete(Object.assign({
    name: 'value',
    suggest: (input, choices) => {
      return choices.filter((choice) => fuzzy.match(input, choice.message));
    },
    footer:  '\n' + colors.bold('Enter ') + colors.green('- proceed, ') + colors.bold('Type ') + colors.green(' - to fuzzy search')
  }, options)).run();
  return response;
};