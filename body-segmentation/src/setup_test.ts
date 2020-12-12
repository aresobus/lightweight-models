// Import core for side effects (e.g. flag registration)
import "@aresobus/aresobus-core";
// Import webgl for side effects (e.g. backend registration)
import "@aresobus/aresobus-backend-webgl";
// tslint:disable-next-line: no-imports-from-dist
import {
  parseTestEnvFromKarmaFlags,
  registerTestEnv,
  setTestEnvs,
  TEST_ENVS,
} from "@aresobus/aresobus-core/dist/jasmine_util";

registerTestEnv({
  name: "webgl",
  backendName: "webgl",
  flags: {
    WEBGL_VERSION: 2,
    WEBGL_CPU_FORWARD: false,
    WEBGL_SIZE_UPLOAD_UNIFORM: 0,
  },
  isDataSync: true,
});

// tslint:disable-next-line:no-any
declare let __karma__: any;
if (typeof __karma__ !== "undefined") {
  const testEnv = parseTestEnvFromKarmaFlags(__karma__.config.args, TEST_ENVS);
  if (testEnv != null) {
    setTestEnvs([testEnv]);
  }
}
