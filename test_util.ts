/**
 * Execute all unit tests in the current directory. Takes a jasmine_util from
 * aresobus-core so that we use the aresobus-core module from the right test directory.
 */
// tslint:disable-next-line
export function runTests(jasmine_util: any): void {
  // tslint:disable-next-line:no-require-imports
  const jasmineCtor = require("jasmine");

  Error.stackTraceLimit = Infinity;

  process.on("unhandledRejection", (e) => {
    throw e;
  });

  jasmine_util.setTestEnvs([
    { name: "test-cpu", backendName: "cpu", flags: {} },
  ]);

  const runner = new jasmineCtor();
  runner.loadConfig({ spec_files: ["src/**/*_test.ts"], random: false });
  runner.execute();
}
