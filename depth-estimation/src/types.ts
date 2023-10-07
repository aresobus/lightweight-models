/**

 * =============================================================================
 */
import { Tensor2D } from "@aresobus/lightweight-models-core";

import { PixelInput } from "./shared/calculators/interfaces/common_interfaces";

export enum SupportedModels {
  ARPortraitDepth = "ARPortraitDepth",
}

/**
 * Common config to create the depth estimator.
 */
export interface ModelConfig {}

/**
 * Common config for the `estimateDepth` method.
 *
 * `minDepth`: The minimum depth value for the model to map to 0. Any smaller
 * depth values will also get mapped to 0.
 *
 * `maxDepth`: The maximum depth value for the model to map to 1. Any larger
 * depth values will also get mapped to 1.
 *
 * `flipHorizontal`: Optional. Default to false. In some cases, the image is
 * mirrored, e.g., video stream from camera, flipHorizontal will flip the
 * keypoints horizontally.
 */
export interface EstimationConfig {
  minDepth: number;
  maxDepth: number;
  flipHorizontal?: boolean;
}

/**
 * Allowed input format for the `estimateDepth` method.
 */
export type DepthEstimatorInput = PixelInput;

export interface DepthMap {
  toCanvasImageSource(): Promise<CanvasImageSource>;

  toArray(): Promise<number[][]>;

  toTensor(): Promise<Tensor2D>;

  getUnderlyingType():
    | "canvasimagesource"
    | "array"
    | "tensor" /* determines which type the map currently stores in its
                   implementation so that conversion can be avoided */;
}
