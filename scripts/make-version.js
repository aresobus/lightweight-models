const fs = require("fs");

const dirName = process.argv[2];
const packageJsonFile = dirName + "/package.json";
if (!fs.existsSync(packageJsonFile)) {
  console.log(
    packageJsonFile,
    "does not exist. Please call this script as follows:"
  );
  console.log("./scripts/make-version.js DIR_NAME");
  process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packageJsonFile, "utf8")).version;

const versionCode = `

// This code is auto-generated, do not modify this file!
const version = '${version}';
export {version};
`;

fs.writeFile(dirName + "/src/version.ts", versionCode, (err) => {
  if (err) {
    throw new Error(`Could not save version file ${version}: ${err}`);
  }
  console.log(`Version file for version ${version} saved sucessfully.`);
});
