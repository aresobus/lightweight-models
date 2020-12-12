/**
 * This file is necessary so we register all test environments before we start
 * executing tests.
 */

import "@aresobus/aresobus-backend-webgl";
// tslint:disable-next-line: no-imports-from-dist
import { setTestEnvs } from "@aresobus/aresobus-core/dist/jasmine_util";

// Increase test timeout since we are fetching the model files from GCS.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// Run browser tests againts both the cpu and webgl backends.
setTestEnvs([
  // WebGL.
  {
    name: "test-webgl",
    backendName: "webgl",
    flags: {
      WEBGL_VERSION: 2,
      WEBGL_CPU_FORWARD: false,
      WEBGL_SIZE_UPLOAD_UNIFORM: 0,
    },
    isDataSync: true,
  },
  // CPU.
  // TODO(nsthorat): Enable this once we have CPU support
  // {name: 'cpu', backendName: 'cpu'}
]);
