var cp = require('child_process');

module.exports = async function execCommand(cmd, opts) {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, opts, function(err, stdout, stderr) {
      if (err) {
        return reject(err, stderr);
      } else {
        return resolve(stdout.toString());
      }
    });
  });
}