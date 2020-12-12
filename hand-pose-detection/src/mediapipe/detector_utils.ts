import {
  DEFAULT_MPHANDS_ESTIMATION_CONFIG,
  DEFAULT_MPHANDS_MODEL_CONFIG,
} from "./constants";
import {
  MediaPipeHandsMediaPipeEstimationConfig,
  MediaPipeHandsMediaPipeModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeHandsMediaPipeModelConfig
): MediaPipeHandsMediaPipeModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_MPHANDS_MODEL_CONFIG };
  }

  const config: MediaPipeHandsMediaPipeModelConfig = { ...modelConfig };

  config.runtime = "mediapipe";

  if (config.maxHands == null) {
    config.maxHands = DEFAULT_MPHANDS_MODEL_CONFIG.maxHands;
  }

  if (config.modelType == null) {
    config.modelType = DEFAULT_MPHANDS_MODEL_CONFIG.modelType;
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: MediaPipeHandsMediaPipeEstimationConfig
): MediaPipeHandsMediaPipeEstimationConfig {
  if (estimationConfig == null) {
    return { ...DEFAULT_MPHANDS_ESTIMATION_CONFIG };
  }

  const config = { ...estimationConfig };

  if (config.flipHorizontal == null) {
    config.flipHorizontal = DEFAULT_MPHANDS_ESTIMATION_CONFIG.flipHorizontal;
  }

  if (config.staticImageMode == null) {
    config.staticImageMode = DEFAULT_MPHANDS_ESTIMATION_CONFIG.staticImageMode;
  }

  return config;
}
