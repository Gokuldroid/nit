const { AutoComplete } = require('enquirer');
const fuzzy = require('fuzzy');
const colors = require('ansi-colors');

module.exports = async (options) => {
  const response = await new AutoComplete(Object.assign({
    name: 'value',
    multiple: true,
    suggest: (input, choices) => {
      return choices.filter((choice) => fuzzy.match(input, choice.message));
    },
    footer: colors.bold('Space ') + colors.green('- toggle selection, ') + colors.bold('Enter ') + colors.green(' - Proceed, ') + colors.bold('Type') + colors.green(' - To fuzzy search')
  }, options)).run();
  return response;
};

