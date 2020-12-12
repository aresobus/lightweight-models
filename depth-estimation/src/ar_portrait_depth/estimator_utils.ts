/**

 * =============================================================================
 */

import {
  DEFAULT_AR_PORTRAIT_DEPTH_ESTIMATION_CONFIG,
  DEFAULT_AR_PORTRAIT_DEPTH_MODEL_CONFIG,
} from "./constants";
import {
  ARPortraitDepthEstimationConfig,
  ARPortraitDepthModelConfig,
} from "./types";

export function validateModelConfig(
  modelConfig: ARPortraitDepthModelConfig
): ARPortraitDepthModelConfig {
  if (modelConfig == null) {
    return { ...DEFAULT_AR_PORTRAIT_DEPTH_MODEL_CONFIG };
  }

  const config = { ...modelConfig };

  if (config.depthModelUrl == null) {
    config.depthModelUrl = DEFAULT_AR_PORTRAIT_DEPTH_MODEL_CONFIG.depthModelUrl;
  }

  return config;
}

export function validateEstimationConfig(
  estimationConfig: ARPortraitDepthEstimationConfig
) {
  if (
    estimationConfig == null ||
    estimationConfig.minDepth == null ||
    estimationConfig.maxDepth == null
  ) {
    throw new Error(
      "An estimation config with " +
        "minDepth and maxDepth set must be provided."
    );
  }

  if (estimationConfig.minDepth > estimationConfig.maxDepth) {
    throw new Error("minDepth must be <= maxDepth.");
  }

  const config = { ...estimationConfig };

  if (config.flipHorizontal == null) {
    config.flipHorizontal =
      DEFAULT_AR_PORTRAIT_DEPTH_ESTIMATION_CONFIG.flipHorizontal;
  }

  return config;
}
