import { EstimationConfig, ModelConfig } from "../types";

export type MediaPipeHandsModelType = "lite" | "full";

/**
 * Common MediaPipeHands model config.
 */
export interface MediaPipeHandsModelConfig extends ModelConfig {
  runtime: "mediapipe" | "aresobus";
  modelType?: MediaPipeHandsModelType;
}

export interface MediaPipeHandsEstimationConfig extends EstimationConfig {}

/**
 * Model parameters for MediaPipeHands MediaPipe runtime
 *
 * `runtime`: Must set to be 'mediapipe'.
 *
 * `modelType`: Optional. Possible values: 'lite'|'full'. Defaults to
 * 'full'. Landmark accuracy as well as inference latency generally go up with
 * the increasing model complexity (lite to full).
 *
 * `solutionPath`: Optional. The path to where the wasm binary and model files
 * are located.
 */
export interface MediaPipeHandsMediaPipeModelConfig
  extends MediaPipeHandsModelConfig {
  runtime: "mediapipe";
  solutionPath?: string;
}

/**
 * Hand estimation parameters for MediaPipeHands MediaPipe runtime.
 */
export interface MediaPipeHandsMediaPipeEstimationConfig
  extends MediaPipeHandsEstimationConfig {}
