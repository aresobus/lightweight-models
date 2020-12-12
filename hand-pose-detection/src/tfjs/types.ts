import {
  MediaPipeHandsEstimationConfig,
  MediaPipeHandsModelConfig,
} from "../mediapipe/types";

/**
 * Model parameters for MediaPipeHands aresobus runtime.
 *
 * `runtime`: Must set to be 'aresobus'.
 *
 * `modelType`: Optional. Possible values: 'lite'|'full'. Defaults to
 * 'full'. Landmark accuracy as well as inference latency generally go up with
 * the increasing model complexity (lite to full).
 *
 * `detectorModelUrl`: Optional. An optional string that specifies custom url of
 * the detector model. This is useful for area/countries that don't have access
 * to the model hosted on tf.hub.
 *
 * `landmarkModelUrl`: Optional. An optional string that specifies custom url of
 * the landmark model. This is useful for area/countries that don't have access
 * to the model hosted on tf.hub.
 */
export interface MediaPipeHandsaresobusModelConfig
  extends MediaPipeHandsModelConfig {
  runtime: "aresobus";
  detectorModelUrl?: string;
  landmarkModelUrl?: string;
}

/**
 * Hand estimation parameters for MediaPipeHands aresobus runtime.
 */
export interface MediaPipeHandsaresobusEstimationConfig
  extends MediaPipeHandsEstimationConfig {}
