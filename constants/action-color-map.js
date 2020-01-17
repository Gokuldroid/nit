const colors = require('ansi-colors');

const actionColorMap = {
  "A": colors.green('A'),
  "C": colors.magenta('C'),
  "D": colors.red('D'),
  "M": colors.blue('M'),
  "R": colors.yellow('R'),
  "T": colors.yellow('T'),
  "U": colors.white('U'),
  "X": colors.red('X'),
  "B": colors.red('B')
}


module.exports = (action) => {
  return actionColorMap[action] || actionColorMap['U'];
}