import { PixelInput } from "./shared/calculators/interfaces/common_interfaces";

export enum SupportedModels {
  BodyPix = "BodyPix",
  MediaPipeSelfieSegmentation = "MediaPipeSelfieSegmentation",
}

/**
 * Common config to create the body segmenter.
 */
export interface ModelConfig {}

/**
 * Common config for the `segmentPeople` method.
 *
 * `flipHorizontal`: Optional. Default to false. In some cases, the image is
 * mirrored, e.g. video stream from camera, flipHorizontal will flip the
 * keypoints horizontally.
 */
export interface SegmentationConfig {
  flipHorizontal?: boolean;
}

/**
 * Allowed input format for the `segmentPeople` method.
 */
export type BodySegmenterInput = PixelInput;
