const prompts = require('prompts');
const fuzzy = require('fuzzy');

module.exports = async (options) => {
  const response = await prompts(Object.assign({
    type: 'autocomplete',
    name: 'value',
    suggest: (input, choices) => {
      return new Promise((resolve, reject) => {
        var results = fuzzy.filter(input, choices)
        resolve(results.map((match)=> match.string));    
      });
    }
  }, options));
  return response.value;
};