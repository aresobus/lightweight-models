import {
  DEFAULT_FACE_DETECTOR_ESTIMATION_CONFIG,
  DEFAULT_FACE_DETECTOR_MODEL_CONFIG,
} from "./constants";
import {
  MediaPipeFaceDetectorMediaPipeEstimationConfig,
  MediaPipeFaceDetectorMediaPipeModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeFaceDetectorMediaPipeModelConfig
): MediaPipeFaceDetectorMediaPipeModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_FACE_DETECTOR_MODEL_CONFIG };
  }

  const config: MediaPipeFaceDetectorMediaPipeModelConfig = { ...modelConfig };

  config.runtime = "mediapipe";

  if (config.modelType == null) {
    config.modelType = DEFAULT_FACE_DETECTOR_MODEL_CONFIG.modelType;
  }

  if (config.maxFaces == null) {
    config.maxFaces = DEFAULT_FACE_DETECTOR_MODEL_CONFIG.maxFaces;
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: MediaPipeFaceDetectorMediaPipeEstimationConfig
): MediaPipeFaceDetectorMediaPipeEstimationConfig {
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
