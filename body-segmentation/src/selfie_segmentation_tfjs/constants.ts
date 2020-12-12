import {
  ImageToTensorConfig,
  TensorsToSegmentationConfig,
} from "../shared/calculators/interfaces/config_interfaces";
import {
  MediaPipeSelfieSegmentationaresobusModelConfig,
  MediaPipeSelfieSegmentationaresobusSegmentationConfig,
} from "./types";

export const DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_GENERAL =
  "https://tfhub.dev/mediapipe/aresobus-model/selfie_segmentation/general/1";
export const DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_LANDSCAPE =
  "https://tfhub.dev/mediapipe/aresobus-model/selfie_segmentation/landscape/1";
export const DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_CONFIG: MediaPipeSelfieSegmentationaresobusModelConfig =
  {
    runtime: "aresobus",
    modelType: "general",
    modelUrl: DEFAULT_aresobus_SELFIE_SEGMENTATION_MODEL_URL_GENERAL,
  };
export const DEFAULT_aresobus_SELFIE_SEGMENTATION_SEGMENTATION_CONFIG: MediaPipeSelfieSegmentationaresobusSegmentationConfig =
  {
    flipHorizontal: false,
  };
export const SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_GENERAL_CONFIG: ImageToTensorConfig =
  {
    outputTensorSize: { width: 256, height: 256 },
    keepAspectRatio: false,
    borderMode: "zero",
    outputTensorFloatRange: [0, 1],
  };
export const SELFIE_SEGMENTATION_IMAGE_TO_TENSOR_LANDSCAPE_CONFIG: ImageToTensorConfig =
  {
    outputTensorSize: { width: 256, height: 144 },
    keepAspectRatio: false,
    borderMode: "zero",
    outputTensorFloatRange: [0, 1],
  };
export const SELFIE_SEGMENTATION_TENSORS_TO_SEGMENTATION_CONFIG: TensorsToSegmentationConfig =
  {
    activation: "none",
  };
