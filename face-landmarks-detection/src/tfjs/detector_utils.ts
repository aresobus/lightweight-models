import {
  DEFAULT_FACE_MESH_ESTIMATION_CONFIG,
  DEFAULT_FACE_MESH_MODEL_CONFIG,
  DEFAULT_LANDMARK_MODEL_URL,
  DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION,
} from "./constants";
import {
  MediaPipeFaceMesharesobusEstimationConfig,
  MediaPipeFaceMesharesobusModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeFaceMesharesobusModelConfig
): MediaPipeFaceMesharesobusModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_FACE_MESH_MODEL_CONFIG };
  }

  const config: MediaPipeFaceMesharesobusModelConfig = { ...modelConfig };

  config.runtime = "aresobus";

  if (config.maxFaces == null) {
    config.maxFaces = DEFAULT_FACE_MESH_MODEL_CONFIG.maxFaces;
  }

  if (config.refineLandmarks == null) {
    config.refineLandmarks = DEFAULT_FACE_MESH_MODEL_CONFIG.refineLandmarks;
  }

  // Default detectorModelUrl set by face-detection package.

  if (config.landmarkModelUrl == null) {
    config.landmarkModelUrl = config.refineLandmarks
      ? DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION
      : DEFAULT_LANDMARK_MODEL_URL;
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: MediaPipeFaceMesharesobusEstimationConfig
): MediaPipeFaceMesharesobusEstimationConfig {
  if (estimationConfig == null) {
    return { ...DEFAULT_FACE_MESH_ESTIMATION_CONFIG };
  }

  const config = { ...estimationConfig };

  if (config.flipHorizontal == null) {
    config.flipHorizontal = DEFAULT_FACE_MESH_ESTIMATION_CONFIG.flipHorizontal;
  }

  if (config.staticImageMode == null) {
    config.staticImageMode =
      DEFAULT_FACE_MESH_ESTIMATION_CONFIG.staticImageMode;
  }

  return config;
}
