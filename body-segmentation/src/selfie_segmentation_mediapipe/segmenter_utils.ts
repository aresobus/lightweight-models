import {
  DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG,
  DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG,
} from "./constants";
import {
  MediaPipeSelfieSegmentationMediaPipeModelConfig,
  MediaPipeSelfieSegmentationMediaPipeSegmentationConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeSelfieSegmentationMediaPipeModelConfig
): MediaPipeSelfieSegmentationMediaPipeModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG };
  }

  const config: MediaPipeSelfieSegmentationMediaPipeModelConfig = {
    ...modelConfig,
  };

  config.runtime = "mediapipe";

  if (config.modelType == null) {
    config.modelType =
      DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG.modelType;
  }

  return config;
}

export function validateSegmentationConfig(
  segmentationConfig: MediaPipeSelfieSegmentationMediaPipeSegmentationConfig
): MediaPipeSelfieSegmentationMediaPipeSegmentationConfig {
  if (segmentationConfig == null) {
    return { ...DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG };
  }

  const config = { ...segmentationConfig };

  if (config.flipHorizontal == null) {
    config.flipHorizontal =
      DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG.flipHorizontal;
  }

  return config;
}
