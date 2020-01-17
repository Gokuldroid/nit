const { Toggle } = require('enquirer');


module.exports = async (options) => {
  let result = await new Toggle(Object.assign({
    name: 'value',
    radio: true
  }, options)).run();
  return result;
};