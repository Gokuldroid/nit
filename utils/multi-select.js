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
    actions: {
      ctrl: {
        a: 'a'
      }
    },
    footer: '\n' + colors.bold('Space ') + colors.green('- toggle selection, ') + colors.bold('Enter ') + colors.green('- proceed, ') + colors.bold('Type ') + colors.green('- fuzzy search, ') + colors.bold('Ctrl+A ') + colors.green('- select all')
  }, options)).run();
  return response;
};

