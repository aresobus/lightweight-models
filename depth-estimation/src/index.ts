/**

 * =============================================================================
 */

// Entry point to create a new detector instance.
export {
  ARPortraitDepthEstimationConfig,
  ARPortraitDepthModelConfig,
} from "./ar_portrait_depth/types";
export { createEstimator } from "./create_estimator";
// DepthEstimator class.
export { DepthEstimator } from "./depth_estimator";

// Supported models enum.
export * from "./types";
