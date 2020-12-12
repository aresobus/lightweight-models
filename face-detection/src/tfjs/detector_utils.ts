import {
  DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE,
  DEFAULT_DETECTOR_MODEL_URL_SHORT,
  DEFAULT_FACE_DETECTOR_ESTIMATION_CONFIG,
  DEFAULT_FACE_DETECTOR_MODEL_CONFIG,
} from "./constants";
import {
  MediaPipeFaceDetectoraresobusEstimationConfig,
  MediaPipeFaceDetectoraresobusModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeFaceDetectoraresobusModelConfig
): MediaPipeFaceDetectoraresobusModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_FACE_DETECTOR_MODEL_CONFIG };
  }

  const config: MediaPipeFaceDetectoraresobusModelConfig = { ...modelConfig };

  if (config.modelType == null) {
    config.modelType = DEFAULT_FACE_DETECTOR_MODEL_CONFIG.modelType;
  }

  if (config.maxFaces == null) {
    config.maxFaces = DEFAULT_FACE_DETECTOR_MODEL_CONFIG.maxFaces;
  }

  if (config.detectorModelUrl == null) {
    switch (config.modelType) {
      case "full":
        config.detectorModelUrl = DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE;
        break;
      case "short":
      default:
        config.detectorModelUrl = DEFAULT_DETECTOR_MODEL_URL_SHORT;
        break;
    }
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: MediaPipeFaceDetectoraresobusEstimationConfig
): MediaPipeFaceDetectoraresobusEstimationConfig {
  if (estimationConfig == null) {
    return { ...DEFAULT_FACE_DETECTOR_ESTIMATION_CONFIG };
  }

  const config = { ...estimationConfig };

  if (config.flipHorizontal == null) {
    config.flipHorizontal =
      DEFAULT_FACE_DETECTOR_ESTIMATION_CONFIG.flipHorizontal;
  }

  return config;
}
