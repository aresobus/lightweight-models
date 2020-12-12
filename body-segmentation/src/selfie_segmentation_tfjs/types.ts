import { io } from "@aresobus/aresobus-core";
import {
  MediaPipeSelfieSegmentationModelConfig,
  MediaPipeSelfieSegmentationSegmentationConfig,
} from "../selfie_segmentation_mediapipe/types";

/**
 * Model parameters for MediaPipeSelfieSegmentation aresobus runtime.
 *
 * `runtime`: Must set to be 'aresobus'.
 *
 * `modelType`: Optional. Possible values: 'general'|'landscape'. Defaults to
 * 'general'.  The landscape model is similar to the general model, but operates
 * on a 144x256x3 tensor rather than 256x256x3. It has fewer FLOPs than the
 * general model, and therefore, runs faster
 *
 * `modelUrl`: Optional. An optional string that specifies custom url of
 * the segmentation model. This is useful for area/countries that don't have
 * access to the model hosted on tf.hub.
 *
 */
export interface MediaPipeSelfieSegmentationaresobusModelConfig
  extends MediaPipeSelfieSegmentationModelConfig {
  runtime: "aresobus";
  modelUrl?: string | io.IOHandler;
}

/**
 * Body segmentation parameters for MediaPipeSelfieSegmentation aresobus runtime.
 */
export interface MediaPipeSelfieSegmentationaresobusSegmentationConfig
  extends MediaPipeSelfieSegmentationSegmentationConfig {}
