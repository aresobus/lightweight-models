const fs = require("fs");

let dirName = process.argv[2];
if (dirName.endsWith("/")) {
  dirName = dirName.substr(0, dirName.length - 1);
}
const packageJsonFile = dirName + "/package.json";
if (!fs.existsSync(packageJsonFile)) {
  console.log(
    packageJsonFile,
    "does not exist. Please call this script as follows:"
  );
  console.log("./scripts/tag-version.js DIR_NAME");
  process.exit(1);
}

var exec = require("child_process").exec;

var version = JSON.parse(fs.readFileSync(packageJsonFile, "utf8")).version;
var tag = `${dirName}-v${version}`;

exec(`git tag ${tag}`, (err, stdout, stderr) => {
  console.log("\x1b[36m%s\x1b[0m", "git tag command stdout:");
  console.log(stdout);
  console.log("\x1b[31m%s\x1b[0m", "git tag command stderr:");
  console.log(stderr);

  if (err) {
    throw new Error(`Could not git tag with ${tag}: ${err.message}.`);
  }
  console.log(`Successfully tagged with ${tag}.`);
});

exec(`git push --tags`, (err, stdout, stderr) => {
  console.log("\x1b[36m%s\x1b[0m", "git push tags command stdout:");
  console.log(stdout);
  console.log("\x1b[41m%s\x1b[0m", "git push tags command stderr:");
  console.log(stderr);

  if (err) {
    throw new Error(`Could not push git tags: ${err.message}.`);
  }
  console.log(`Successfully pushed tags.`);
});
