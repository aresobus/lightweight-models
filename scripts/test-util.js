const shell = require("shelljs");

function exec(command, opt, ignoreCode) {
  const res = shell.exec(command, opt);
  if (!ignoreCode && res.code !== 0) {
    shell.echo("command", command, "returned code", res.code);
    process.exit(1);
  }
  return res;
}

exports.exec = exec;
