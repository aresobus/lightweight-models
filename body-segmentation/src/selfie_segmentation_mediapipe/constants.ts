import {
  MediaPipeSelfieSegmentationMediaPipeModelConfig,
  MediaPipeSelfieSegmentationMediaPipeSegmentationConfig,
} from "./types";

export const DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_MODEL_CONFIG: MediaPipeSelfieSegmentationMediaPipeModelConfig =
  {
    runtime: "mediapipe",
    modelType: "general",
  };

export const DEFAULT_MEDIAPIPE_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG: MediaPipeSelfieSegmentationMediaPipeSegmentationConfig =
  {
    flipHorizontal: false,
  };
