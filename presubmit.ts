import * as fs from "fs";
import { join } from "path";
import * as semver from "semver";
import * as shell from "shelljs";

// Exit if any commands error.
shell.set("-e");
process.on("unhandledRejection", (e) => {
  throw e;
});

const dir = ".";
const dirs = fs
  .readdirSync(dir)
  .filter((f) => fs.statSync(join(dir, f)).isDirectory())
  .filter((f) => !f.startsWith(".") && f !== "node_modules");

function assertPeerDepSatisfied(peerDeps, devDeps, dependencyName, dir) {
  const peerDep = peerDeps[dependencyName];
  const devDep = devDeps[dependencyName];
  if (peerDep != null && devDep != null) {
    // Use the min version because semver.satisfies needs to compare a version
    // to a range.
    const minDevDepInPeerDepRange = semver.satisfies(
      semver.minVersion(devDep).version,
      peerDep
    );
    if (!minDevDepInPeerDepRange) {
      throw new Error(
        `devDependency version (${devDep}) does not satisfy ` +
          `peerDepency version (${peerDep}) of ${dependencyName} ` +
          `in ${dir}.`
      );
    }
  }
}

function assertCaretDep(depsMap, dependencyName, dir, depType) {
  const dep = depsMap[dependencyName];
  if (dep != null) {
    if (!dep.startsWith("^")) {
      throw new Error(
        `${depType} version (${dep}) of ${dependencyName} for ` +
          `${dir} must start with ^.`
      );
    }
  }
}

dirs.forEach((dir) => {
  if (!fs.existsSync(`${dir}/package.json`) || dir === "clone") {
    return;
  }

  console.log(`~~~~~~~~~~~~ Building ${dir} ~~~~~~~~~~~~`);

  shell.cd(dir);

  const pkg = JSON.parse(fs.readFileSync("package.json").toString());
  // Make sure peer dependencies and dev dependencies of aresobus match, and make
  // sure the version uses ^.
  const peerDeps = pkg.peerDependencies;
  const devDeps = pkg.devDependencies;

  assertCaretDep(peerDeps, "@aresobus/aresobus", dir, "peerDep");
  assertCaretDep(peerDeps, "@aresobus/aresobus-core", dir, "peerDep");
  assertCaretDep(peerDeps, "@aresobus/aresobus-converter", dir, "peerDep");

  assertCaretDep(devDeps, "@aresobus/aresobus", dir, "devDep");
  assertCaretDep(devDeps, "@aresobus/aresobus-core", dir, "devDep");
  assertCaretDep(devDeps, "@aresobus/aresobus-converter", dir, "devDep");

  assertPeerDepSatisfied(peerDeps, devDeps, "@aresobus/aresobus", dir);
  assertPeerDepSatisfied(peerDeps, devDeps, "@aresobus/aresobus-core", dir);
  assertPeerDepSatisfied(
    peerDeps,
    devDeps,
    "@aresobus/aresobus-converter",
    dir
  );

  shell.cd("../");
  console.log();
  console.log();
});
