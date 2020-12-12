import { EstimationConfig, ModelConfig } from "../types";

export type MediaPipeFaceDetectorModelType = "short" | "full";

/**
 * Common MediaPipeFaceDetector model config.
 */
export interface MediaPipeFaceDetectorModelConfig extends ModelConfig {
  modelType?: MediaPipeFaceDetectorModelType;
  runtime: "mediapipe" | "aresobus";
}

export interface MediaPipeFaceDetectorEstimationConfig
  extends EstimationConfig {}

/**
 * Model parameters for MediaPipeFaceDetector MediaPipe runtime
 *
 * `modelType`: Optional. Possible values: 'short'|'full'. Defaults to
 * 'short'. The short-range model that works best for faces within 2 meters from
 * the camera, while the full-range model works best for faces within 5 meters.
 * For the full-range option, a sparse model is used for its improved inference
 * speed.
 *
 * `runtime`: Must set to be 'mediapipe'.
 *
 * `solutionPath`: Optional. The path to where the wasm binary and model files
 * are located.
 */
export interface MediaPipeFaceDetectorMediaPipeModelConfig
  extends MediaPipeFaceDetectorModelConfig {
  runtime: "mediapipe";
  solutionPath?: string;
}

/**
 * Face estimation parameters for MediaPipeFaceDetector MediaPipe runtime.
 */
export interface MediaPipeFaceDetectorMediaPipeEstimationConfig
  extends MediaPipeFaceDetectorEstimationConfig {}
