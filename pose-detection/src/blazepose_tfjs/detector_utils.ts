import {
  DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG,
  DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL,
  DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_HEAVY,
  DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_LITE,
  DEFAULT_BLAZEPOSE_MODEL_CONFIG,
} from "./constants";
import {
  BlazePosearesobusEstimationConfig,
  BlazePosearesobusModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: BlazePosearesobusModelConfig
): BlazePosearesobusModelConfig {
  const config: BlazePosearesobusModelConfig =
    modelConfig == null
      ? ({ ...DEFAULT_BLAZEPOSE_MODEL_CONFIG } as BlazePosearesobusModelConfig)
      : { ...modelConfig };

  if (config.enableSmoothing == null) {
    config.enableSmoothing = DEFAULT_BLAZEPOSE_MODEL_CONFIG.enableSmoothing;
  }

  if (config.enableSegmentation == null) {
    config.enableSegmentation =
      DEFAULT_BLAZEPOSE_MODEL_CONFIG.enableSegmentation;
  }

  if (config.smoothSegmentation == null) {
    config.smoothSegmentation =
      DEFAULT_BLAZEPOSE_MODEL_CONFIG.smoothSegmentation;
  }

  if (config.modelType == null) {
    config.modelType = DEFAULT_BLAZEPOSE_MODEL_CONFIG.modelType;
  }

  if (config.detectorModelUrl == null) {
    config.detectorModelUrl = DEFAULT_BLAZEPOSE_MODEL_CONFIG.detectorModelUrl;
  }

  if (config.landmarkModelUrl == null) {
    switch (config.modelType) {
      case "lite":
        config.landmarkModelUrl = DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_LITE;
        break;
      case "heavy":
        config.landmarkModelUrl = DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_HEAVY;
        break;
      case "full":
      default:
        config.landmarkModelUrl = DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL;
        break;
    }
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: BlazePosearesobusEstimationConfig
): BlazePosearesobusEstimationConfig {
  let config;

  if (estimationConfig == null) {
    config = DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG;
  } else {
    config = { ...estimationConfig };
  }

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

  return config;
}
