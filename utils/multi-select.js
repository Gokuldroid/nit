const prompts = require('enquirer');


module.exports = async (options) => {
  const response = await prompts(Object.assign({
    type: 'autocompleteMultiselect',
    name: 'value',
    suggest: (input, choices) => {
      return new Promise((resolve, reject) => {
        var results = fuzzy.filter(input, choices)
        resolve(results.map((match)=> match.string));    
      });
    }
  }, options));
  return (response.value || []).map((index) => options.choices[index]);
};

