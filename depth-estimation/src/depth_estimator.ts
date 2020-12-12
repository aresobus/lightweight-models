/**

 * =============================================================================
 */
import { ARPortraitDepthEstimationConfig } from "./ar_portrait_depth/types";
import { DepthEstimatorInput, DepthMap } from "./types";

/**
 * User-facing interface for all depth estimators.
 */
export interface DepthEstimator {
  /**
   * Estimates depth in the input image.
   *
   * @param input The image to classify. Can be a tensor, DOM element image,
   * video, or canvas.
   * @param estimationConfig common config for `estimateDepth`.
   */
  estimateDepth(
    input: DepthEstimatorInput,
    estimationConfig?: ARPortraitDepthEstimationConfig
  ): Promise<DepthMap>;

  /**
   * Disposes the underlying models from memory.
   */
  dispose(): void;

  /**
   * Resets global states in the model.
   */
  reset(): void;
}
