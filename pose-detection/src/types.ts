import {
  Keypoint,
  PixelInput,
  Segmentation,
} from "./shared/calculators/interfaces/common_interfaces";
import { BoundingBox } from "./shared/calculators/interfaces/shape_interfaces";

export { Keypoint };

export enum SupportedModels {
  MoveNet = "MoveNet",
  BlazePose = "BlazePose",
  PoseNet = "PoseNet",
}

export type QuantBytes = 1 | 2 | 4;

/**
 * Common config to create the pose detector.
 */
export interface ModelConfig {}

/**
 * Common config for the `estimatePoses` method.
 *
 * `maxPoses`: Optional. Max number poses to detect. Default to 1, which means
 * single pose detection. Single pose detection runs more efficiently, while
 * multi-pose (maxPoses > 1) detection is usually much slower. Multi-pose
 * detection should only be used when needed.
 *
 * `flipHorizontal`: Optional. Default to false. In some cases, the image is
 * mirrored, e.g. video stream from camera, flipHorizontal will flip the
 * keypoints horizontally.
 */
export interface EstimationConfig {
  maxPoses?: number;
  flipHorizontal?: boolean;
}

/**
 * Allowed input format for the `estimatePoses` method.
 */
export type PoseDetectorInput = PixelInput;

export interface InputResolution {
  width: number;
  height: number;
}

export interface Pose {
  keypoints: Keypoint[];
  score?: number; // The probability of an actual pose.
  keypoints3D?: Keypoint[]; // Keypoints in meters in a 1m * 1m * 1m space.
  box?: BoundingBox; // A bounding box around the detected person.
  segmentation?: Segmentation; // Segmentation mask of the detected person.
  id?: number; // The unique identifier for this (tracked) pose.
}
