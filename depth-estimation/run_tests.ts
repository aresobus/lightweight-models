/**

 * =============================================================================
 */

// Use the CPU backend for running tests.
import "@aresobus/lightweight-models-backend-cpu";
// tslint:disable-next-line:no-imports-from-dist
import * as jasmine_util from "@aresobus/lightweight-models-core/dist/jasmine_util";

// tslint:disable-next-line:no-require-imports
const jasmineCtor = require("jasmine");

Error.stackTraceLimit = Infinity;

process.on("unhandledRejection", (e) => {
  throw e;
});

jasmine_util.setTestEnvs([
  { name: "test-depth-estimation", backendName: "cpu", flags: {} },
]);

const unitTests = "src/**/*_test.ts";

const runner = new jasmineCtor();
runner.loadConfig({ spec_files: [unitTests], random: false });
runner.execute();
