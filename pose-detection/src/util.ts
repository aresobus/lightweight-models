import * as constants from "./constants";
import { SupportedModels } from "./types";

export function getKeypointIndexBySide(model: SupportedModels): {
  left: number[];
  right: number[];
  middle: number[];
} {
  switch (model) {
    case SupportedModels.BlazePose:
      return constants.BLAZEPOSE_KEYPOINTS_BY_SIDE;
    case SupportedModels.PoseNet:
    case SupportedModels.MoveNet:
      return constants.COCO_KEYPOINTS_BY_SIDE;
    default:
      throw new Error(`Model ${model} is not supported.`);
  }
}
export function getAdjacentPairs(model: SupportedModels): number[][] {
  switch (model) {
    case SupportedModels.BlazePose:
      return constants.BLAZEPOSE_CONNECTED_KEYPOINTS_PAIRS;
    case SupportedModels.PoseNet:
    case SupportedModels.MoveNet:
      return constants.COCO_CONNECTED_KEYPOINTS_PAIRS;
    default:
      throw new Error(`Model ${model} is not supported.`);
  }
}

export function getKeypointIndexByName(model: SupportedModels): {
  [index: string]: number;
} {
  switch (model) {
    case SupportedModels.BlazePose:
      return constants.BLAZEPOSE_KEYPOINTS.reduce((map, name, i) => {
        map[name] = i;
        return map;
      }, {} as { [index: string]: number });
    case SupportedModels.PoseNet:
    case SupportedModels.MoveNet:
      return constants.COCO_KEYPOINTS.reduce((map, name, i) => {
        map[name] = i;
        return map;
      }, {} as { [index: string]: number });
    default:
      throw new Error(`Model ${model} is not supported.`);
  }
}
