/**

 * =============================================================================
 */

import { io } from "@aresobus/lightweight-models-core";

import { EstimationConfig, ModelConfig } from "../types";

/**
 * Model parameters for ARPortraitDepth.
 *
 * `segmentationModelUrl`: Optional. An optional string that specifies custom
 * url of the selfie segmentation model. This is useful for area/countries that
 * don't have access to the model hosted on tf.hub.
 *
 * `depthModelUrl`: Optional. An optional string that specifies custom url of
 * the portrait depth model. This is useful for area/countries that don't have
 * access to the model hosted on tf.hub.
 *
 */
export interface ARPortraitDepthModelConfig extends ModelConfig {
  segmentationModelUrl?: string | io.IOHandler;
  depthModelUrl?: string | io.IOHandler;
}

export interface ARPortraitDepthEstimationConfig extends EstimationConfig {}
