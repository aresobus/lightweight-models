import { EstimationConfig, ModelConfig } from "../types";

export type BlazePoseModelType = "lite" | "full" | "heavy";

/**
 * Common BlazePose model config.
 */
export interface BlazePoseModelConfig extends ModelConfig {
  runtime: "mediapipe" | "aresobus";
  enableSmoothing?: boolean;
  enableSegmentation?: boolean;
  smoothSegmentation?: boolean;
  modelType?: BlazePoseModelType;
}

export interface BlazePoseEstimationConfig extends EstimationConfig {}

/**
 * Model parameters for BlazePose MediaPipe runtime
 *
 * `runtime`: Must set to be 'mediapipe'.
 *
 * `enableSmoothing`: Optional. A boolean indicating whether to use temporal
 * filter to smooth the predicted keypoints. Defaults to True. The temporal
 * filter relies on `performance.now()`. You can override this timestamp by
 * passing in your own timestamp (in milliseconds) as the third parameter in
 * `estimatePoses`.
 *
 * `enableSegmentation`: Optional. A boolean indicating whether to generate the
 * segmentation mask. Defaults to false.
 *
 * `smoothSegmentation`: Optional. A boolean indicating whether the solution
 * filters segmentation masks across different input images to reduce jitter.
 * Ignored if `enableSegmentation` is false or static images are passed in.
 * Defaults to true.
 *
 * `modelType`: Optional. Possible values: 'lite'|'full'|'heavy'. Defaults to
 * 'full'. The model accuracy increases from lite to heavy, while the inference
 * speed decreases and memory footprint increases. The heavy variant is intended
 * for applications that require high accuracy, while the lite variant is
 * intended for latency-critical applications. The full variant is a balanced
 * option.
 *
 * `solutionPath`: Optional. The path to where the wasm binary and model files
 * are located.
 */
export interface BlazePoseMediaPipeModelConfig extends BlazePoseModelConfig {
  runtime: "mediapipe";
  solutionPath?: string;
}

/**
 * Pose estimation parameters for BlazePose MediaPipe runtime.
 *
 * `maxPoses`: Optional. Defaults to 1. BlazePose only supports 1 pose for now.
 *
 * `flipHorizontal`: Optional. Default to false. When image data comes from
 * camera, the result has to flip horizontally.
 */
export interface BlazePoseMediaPipeEstimationConfig
  extends BlazePoseEstimationConfig {}
