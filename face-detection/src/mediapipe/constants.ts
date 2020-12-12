import {
  MediaPipeFaceDetectorMediaPipeEstimationConfig,
  MediaPipeFaceDetectorMediaPipeModelConfig,
} from "./types";

export const DEFAULT_FACE_DETECTOR_MODEL_CONFIG: MediaPipeFaceDetectorMediaPipeModelConfig =
  {
    modelType: "short",
    runtime: "mediapipe",
    maxFaces: 1,
  };

export const DEFAULT_FACE_DETECTOR_ESTIMATION_CONFIG: MediaPipeFaceDetectorMediaPipeEstimationConfig =
  {
    flipHorizontal: false,
  };
