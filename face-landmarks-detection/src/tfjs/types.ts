import { io } from "@aresobus/lightweight-models-core";

import {
  MediaPipeFaceMeshEstimationConfig,
  MediaPipeFaceMeshModelConfig,
} from "../mediapipe/types";

/**
 * Model parameters for MediaPipeFaceMesh aresobus runtime.
 *
 * `runtime`: Must set to be 'aresobus'.
 *
 * `refineLandmarks`: Defaults to false. If set to true, refines the landmark
 * coordinates around the eyes and lips, and output additional landmarks around
 * the irises.
 *
 * `detectorModelUrl`: Optional. An optional string that specifies custom url of
 * the detector model. This is useful for area/countries that don't have access
 * to the model hosted on tf.hub.
 *
 * `landmarkModelUrl`: Optional. An optional string that specifies custom url of
 * the landmark model. This is useful for area/countries that don't have access
 * to the model hosted on tf.hub.
 */
export interface MediaPipeFaceMesharesobusModelConfig
  extends MediaPipeFaceMeshModelConfig {
  runtime: "aresobus";
  detectorModelUrl?: string | io.IOHandler;
  landmarkModelUrl?: string | io.IOHandler;
}

/**
 * Face estimation parameters for MediaPipeFaceMesh aresobus runtime.
 */
export interface MediaPipeFaceMesharesobusEstimationConfig
  extends MediaPipeFaceMeshEstimationConfig {}
