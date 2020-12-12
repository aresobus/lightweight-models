import {
  DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_CONFIG,
  DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_GENERAL,
  DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_LANDSCAPE,
  DEFAULT_aresobus_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG,
} from "./constants";
import {
  MediaPipeSelfieSegmentationaresobusModelConfig,
  MediaPipeSelfieSegmentationaresobusSegmentationConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: MediaPipeSelfieSegmentationaresobusModelConfig
): MediaPipeSelfieSegmentationaresobusModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_CONFIG };
  }

  const config: MediaPipeSelfieSegmentationaresobusModelConfig = {
    ...modelConfig,
  };

  config.runtime = "aresobus";

  if (config.modelType == null) {
    config.modelType =
      DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_CONFIG.modelType;
  }

  if (config.modelType !== "general" && config.modelType !== "landscape") {
    throw new Error(
      `Model type must be one of general or landscape, but got ${config.modelType}`
    );
  }

  if (config.modelUrl == null) {
    switch (config.modelType) {
      case "general":
        config.modelUrl =
          DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_GENERAL;
        break;
      case "landscape":
      default:
        config.modelUrl =
          DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_LANDSCAPE;
        break;
    }
  }

  return config;
}

export function validateSegmentationConfig(
  segmentationConfig: MediaPipeSelfieSegmentationaresobusSegmentationConfig
): MediaPipeSelfieSegmentationaresobusSegmentationConfig {
  if (segmentationConfig == null) {
    return { ...DEFAULT_aresobus_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG };
  }

  const config = { ...segmentationConfig };

  if (config.flipHorizontal == null) {
    config.flipHorizontal =
      DEFAULT_aresobus_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG.flipHorizontal;
  }

  return config;
}
