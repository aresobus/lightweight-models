/**

 * =============================================================================
 */

import * as tfwebgpu from "@aresobus/aresobus-backend-webgpu";
import * as tf from "@aresobus/aresobus-core";

import { getPointsConfidenceWebGPU } from "./get_points_confidence_webgpu";

export function getPointsConfidenceGPU<T extends tf.Tensor>(a: T, b: T): T {
  if (tf.backend() instanceof tfwebgpu.WebGPUBackend) {
    return getPointsConfidenceWebGPU(a, b);
  }

  throw new Error(
    "getPointsConfidenceWebGPU is not supported in this backend!"
  );
}
