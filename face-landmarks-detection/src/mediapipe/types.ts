import { EstimationConfig, ModelConfig } from "../types";

/**
 * Common MediaPipeFaceMesh model config.
 */
export interface MediaPipeFaceMeshModelConfig extends ModelConfig {
  runtime: "mediapipe" | "aresobus";
  refineLandmarks: boolean;
}

export interface MediaPipeFaceMeshEstimationConfig extends EstimationConfig {}

/**
 * Model parameters for MediaPipeFaceMesh MediaPipe runtime
 *
 * `runtime`: Must set to be 'mediapipe'.
 *
 * `refineLandmarks`: If set to true, refines the landmark coordinates around
 * the eyes and lips, and output additional landmarks around the irises.
 *
 * `solutionPath`: Optional. The path to where the wasm binary and model files
 * are located.
 */
export interface MediaPipeFaceMeshMediaPipeModelConfig
  extends MediaPipeFaceMeshModelConfig {
  runtime: "mediapipe";
  solutionPath?: string;
}

/**
 * Face estimation parameters for MediaPipeFaceMesh MediaPipe runtime.
 */
export interface MediaPipeFaceMeshMediaPipeEstimationConfig
  extends MediaPipeFaceMeshEstimationConfig {}
