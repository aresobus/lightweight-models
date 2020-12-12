import * as constants from "./constants";
import { SupportedModels } from "./types";

export function getKeypointIndexByContour(model: SupportedModels): {
  [label: string]: number[];
} {
  switch (model) {
    case SupportedModels.MediaPipeFaceMesh:
      return constants.MEDIAPIPE_FACE_MESH_KEYPOINTS_BY_CONTOUR;
    default:
      throw new Error(`Model ${model} is not supported.`);
  }
}

export function getAdjacentPairs(model: SupportedModels): number[][] {
  switch (model) {
    case SupportedModels.MediaPipeFaceMesh:
      return constants.MEDIAPIPE_FACE_MESH_CONNECTED_KEYPOINTS_PAIRS;
    default:
      throw new Error(`Model ${model} is not supported.`);
  }
}
