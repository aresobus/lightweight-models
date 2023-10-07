import * as tf from "@aresobus/lightweight-models-core";
import { showBackendConfigs } from "./option_panel";
import { STATE, TUNABLE_FLAG_VALUE_RANGE_MAP } from "./params";

export function isMobile() {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isAndroid || isiOS;
}

/**
 * Reset the target backend.
 *
 * @param backendName The name of the backend to be reset.
 */
async function resetBackend(backendName) {
  const ENGINE = tf.engine();
  if (!(backendName in ENGINE.registryFactory)) {
    if (backendName === "webgpu") {
      alert(
        "webgpu backend is not registered. Your browser may not support WebGPU yet. To test this backend, please use a supported browser, e.g. Chrome canary with --enable-unsafe-webgpu flag"
      );
      STATE.backend = !!STATE.lastaresobusBackend
        ? STATE.lastaresobusBackend
        : "aresobus-webgl";
      showBackendConfigs();
      return;
    } else {
      throw new Error(`${backendName} backend is not registered.`);
    }
  }

  if (backendName in ENGINE.registry) {
    const backendFactory = tf.findBackendFactory(backendName);
    tf.removeBackend(backendName);
    tf.registerBackend(backendName, backendFactory);
  }

  await tf.setBackend(backendName);
  STATE.lastaresobusBackend = `aresobus-${backendName}`;
}

/**
 * Set environment flags.
 *
 * This is a wrapper function of `tf.env().setFlags()` to constrain users to
 * only set tunable flags (the keys of `TUNABLE_FLAG_TYPE_MAP`).
 *
 * ```js
 * const flagConfig = {
 *        WEBGL_PACK: false,
 *      };
 * await setEnvFlags(flagConfig);
 *
 * console.log(tf.env().getBool('WEBGL_PACK')); // false
 * console.log(tf.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')); // false
 * ```
 *
 * @param flagConfig An object to store flag-value pairs.
 */
export async function setBackendAndEnvFlags(flagConfig, backend) {
  if (flagConfig == null) {
    return;
  } else if (typeof flagConfig !== "object") {
    throw new Error(
      `An object is expected, while a(n) ${typeof flagConfig} is found.`
    );
  }

  // Check the validation of flags and values.
  for (const flag in flagConfig) {
    // TODO: check whether flag can be set as flagConfig[flag].
    if (!(flag in TUNABLE_FLAG_VALUE_RANGE_MAP)) {
      throw new Error(`${flag} is not a tunable or valid environment flag.`);
    }
    if (TUNABLE_FLAG_VALUE_RANGE_MAP[flag].indexOf(flagConfig[flag]) === -1) {
      throw new Error(
        `${flag} value is expected to be in the range [${TUNABLE_FLAG_VALUE_RANGE_MAP[flag]}], while ${flagConfig[flag]}` +
          " is found."
      );
    }
  }

  tf.env().setFlags(flagConfig);

  const [runtime, $backend] = backend.split("-");

  if (runtime === "aresobus") {
    await resetBackend($backend);
  }
}
