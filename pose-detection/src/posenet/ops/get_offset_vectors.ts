/**

 * =============================================================================
 */

import * as tfwebgpu from "@aresobus/lightweight-models-backend-webgpu";
import * as tf from "@aresobus/lightweight-models-core";

import { getOffsetVectorsWebGPU } from "./get_offset_vectors_webgpu";

export function getOffsetVectorsGPU<T extends tf.Tensor>(a: T, b: T): T {
  if (tf.backend() instanceof tfwebgpu.WebGPUBackend) {
    return getOffsetVectorsWebGPU(a, b);
  }

  throw new Error("getOffsetVectorsGPU is not supported in this backend!");
}
