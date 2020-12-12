import { ModelConfig, SegmentationConfig } from "../types";

export type MediaPipeSelfieSegmentationModelType = "general" | "landscape";

/**
 * Common SelfieSegmentation model config.
 */
export interface MediaPipeSelfieSegmentationModelConfig extends ModelConfig {
  runtime: "mediapipe" | "aresobus";
  modelType?: MediaPipeSelfieSegmentationModelType;
}

export interface MediaPipeSelfieSegmentationSegmentationConfig
  extends SegmentationConfig {}

/**
 * Model parameters for SelfieSegmentation MediaPipe runtime
 *
 * `runtime`: Must set to be 'mediapipe'.
 *
 * `modelType`: Optional. Possible values: 'general'|'landscape'. Defaults to
 * 'general'.  The landscape model is similar to the general model, but operates
 * on a 144x256x3 tensor rather than 256x256x3. It has fewer FLOPs than the
 * general model, and therefore, runs faster
 *
 * `solutionPath`: Optional. The path to where the wasm binary and model files
 * are located.
 * `locateFile`: Optional. The function to return URLs of the wasm binary and
 * model files. If specified at the same time as solutionPath,
 * solutionPath is ignored.
 */
export interface MediaPipeSelfieSegmentationMediaPipeModelConfig
  extends MediaPipeSelfieSegmentationModelConfig {
  runtime: "mediapipe";
  solutionPath?: string;
  locateFile?: (path: string, prefix?: string) => string;
}

/**
 * Body segmentation parameters for SelfieSegmentation MediaPipe runtime.
 */
export interface MediaPipeSelfieSegmentationMediaPipeSegmentationConfig
  extends MediaPipeSelfieSegmentationSegmentationConfig {}
