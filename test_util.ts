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
