/**

 * =============================================================================
 */

import * as tfwebgpu from "@aresobus/lightweight-models-backend-webgpu";
import * as tf from "@aresobus/lightweight-models-core";

import { getPointsConfidenceWebGPU } from "./get_points_confidence_webgpu";

export function getPointsConfidenceGPU<T extends tf.Tensor>(a: T, b: T): T {
  if (tf.backend() instanceof tfwebgpu.WebGPUBackend) {
    return getPointsConfidenceWebGPU(a, b);
  }

  throw new Error(
    "getPointsConfidenceWebGPU is not supported in this backend!"
  );
}
