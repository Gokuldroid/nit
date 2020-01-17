const execCommand = require('./exec-command');
var os = require('os');

function parseBranches(str) {
  if (!str) return [];
  let lines = str.trim().split(os.EOL);
  let res = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim().replace(/^\*\s*/, '');
    res.push(line);
  }
  return res;
}

module.exports = async function branches(cwd, options = {}) {
  let opts = Object.assign({ cwd: cwd }, options);
  let cmd = 'git branch';
  if (opts.remote) {
    cmd += ' -r';
  }

  let output = await execCommand(cmd, opts);
  return parseBranches(output);
}