import {
  BlazePoseMediaPipeEstimationConfig,
  BlazePoseMediaPipeModelConfig,
} from "./types";

export const DEFAULT_BLAZEPOSE_MODEL_CONFIG: BlazePoseMediaPipeModelConfig = {
  runtime: "mediapipe",
  enableSmoothing: true,
  enableSegmentation: false,
  smoothSegmentation: true,
  modelType: "full",
};

export const DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG: BlazePoseMediaPipeEstimationConfig =
  {
    maxPoses: 1,
    flipHorizontal: false,
  };
