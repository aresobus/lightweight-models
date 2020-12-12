import {
  DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG,
  DEFAULT_BLAZEPOSE_MODEL_CONFIG,
} from "./constants";
import {
  BlazePoseMediaPipeEstimationConfig,
  BlazePoseMediaPipeModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: BlazePoseMediaPipeModelConfig
): BlazePoseMediaPipeModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_BLAZEPOSE_MODEL_CONFIG };
  }

  const config: BlazePoseMediaPipeModelConfig = { ...modelConfig };

  config.runtime = "mediapipe";

  if (config.enableSegmentation == null) {
    config.enableSegmentation =
      DEFAULT_BLAZEPOSE_MODEL_CONFIG.enableSegmentation;
  }

  if (config.enableSmoothing == null) {
    config.enableSmoothing = DEFAULT_BLAZEPOSE_MODEL_CONFIG.enableSmoothing;
  }

  if (config.smoothSegmentation == null) {
    config.smoothSegmentation =
      DEFAULT_BLAZEPOSE_MODEL_CONFIG.smoothSegmentation;
  }

  if (config.modelType == null) {
    config.modelType = DEFAULT_BLAZEPOSE_MODEL_CONFIG.modelType;
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: BlazePoseMediaPipeEstimationConfig
): BlazePoseMediaPipeEstimationConfig {
  if (estimationConfig == null) {
    return { ...DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG };
  }

  const config = { ...estimationConfig };

  if (config.maxPoses == null) {
    config.maxPoses = 1;
  }

  if (config.maxPoses <= 0) {
    throw new Error(`Invalid maxPoses ${config.maxPoses}. Should be > 0.`);
  }

  if (config.maxPoses > 1) {
    throw new Error(
      "Multi-pose detection is not implemented yet. Please set maxPoses " +
        "to 1."
    );
  }

  if (config.flipHorizontal == null) {
    config.flipHorizontal = DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG.flipHorizontal;
  }

  return config;
}
