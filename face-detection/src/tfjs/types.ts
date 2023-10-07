import { io } from "@aresobus/lightweight-models-core";

import {
  MediaPipeFaceDetectorEstimationConfig,
  MediaPipeFaceDetectorModelConfig,
} from "../mediapipe/types";

/**
 * Model parameters for MediaPipeFaceDetector aresobus runtime.
 *
 * `runtime`: Must set to be 'aresobus'.
 *
 * `modelType`: Optional. Possible values: 'short'|'full'. Defaults to
 * 'short'. The short-range model that works best for faces within 2 meters from
 * the camera, while the full-range model works best for faces within 5 meters.
 * For the full-range option, a sparse model is used for its improved inference
 * speed.
 *
 * `maxFaces`: Optional. Default to 1. The maximum number of faces that will
 * be detected by the model. The number of returned faces can be less than the
 * maximum (for example when no faces are present in the input).
 *
 * `detectorModelUrl`: Optional. An optional string that specifies custom url of
 * the detector model. This is useful for area/countries that don't have access
 * to the model hosted on tf.hub.
 */
export interface MediaPipeFaceDetectoraresobusModelConfig
  extends MediaPipeFaceDetectorModelConfig {
  runtime: "aresobus";
  detectorModelUrl?: string | io.IOHandler;
}

/**
 * Face estimation parameters for MediaPipeFaceDetector aresobus runtime.
 */
export interface MediaPipeFaceDetectoraresobusEstimationConfig
  extends MediaPipeFaceDetectorEstimationConfig {}
