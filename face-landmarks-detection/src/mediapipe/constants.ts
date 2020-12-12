import {
  MediaPipeFaceMeshMediaPipeEstimationConfig,
  MediaPipeFaceMeshMediaPipeModelConfig,
} from "./types";

export const DEFAULT_FACE_MESH_MODEL_CONFIG: MediaPipeFaceMeshMediaPipeModelConfig =
  {
    runtime: "mediapipe",
    maxFaces: 1,
    refineLandmarks: false,
  };

export const DEFAULT_FACE_MESH_ESTIMATION_CONFIG: MediaPipeFaceMeshMediaPipeEstimationConfig =
  {
    flipHorizontal: false,
    staticImageMode: false,
  };
