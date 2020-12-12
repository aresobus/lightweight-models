import {
  DEFAULT_FACE_MESH_ESTIMATION_CONFIG,
  DEFAULT_FACE_MESH_MODEL_CONFIG,
} from "./constants";
import {
  MediaPipeFaceMeshMediaPipeEstimationConfig,
  MediaPipeFaceMeshMediaPipeModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeFaceMeshMediaPipeModelConfig
): MediaPipeFaceMeshMediaPipeModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_FACE_MESH_MODEL_CONFIG };
  }

  const config: MediaPipeFaceMeshMediaPipeModelConfig = { ...modelConfig };

  config.runtime = "mediapipe";

  if (config.maxFaces == null) {
    config.maxFaces = DEFAULT_FACE_MESH_MODEL_CONFIG.maxFaces;
  }

  if (config.refineLandmarks == null) {
    config.refineLandmarks = DEFAULT_FACE_MESH_MODEL_CONFIG.refineLandmarks;
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: MediaPipeFaceMeshMediaPipeEstimationConfig
): MediaPipeFaceMeshMediaPipeEstimationConfig {
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
