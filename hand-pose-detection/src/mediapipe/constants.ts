import {
  MediaPipeHandsMediaPipeEstimationConfig,
  MediaPipeHandsMediaPipeModelConfig,
} from "./types";

export const DEFAULT_MPHANDS_MODEL_CONFIG: MediaPipeHandsMediaPipeModelConfig =
  {
    runtime: "mediapipe",
    maxHands: 2,
    modelType: "full",
  };

export const DEFAULT_MPHANDS_ESTIMATION_CONFIG: MediaPipeHandsMediaPipeEstimationConfig =
  {
    flipHorizontal: false,
    staticImageMode: false,
  };
