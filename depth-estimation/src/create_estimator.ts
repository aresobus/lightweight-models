/**

 * =============================================================================
 */

import { load as loadARPortraitDepth } from "./ar_portrait_depth/estimator";
import { ARPortraitDepthModelConfig } from "./ar_portrait_depth/types";
import { DepthEstimator } from "./depth_estimator";
import { SupportedModels } from "./types";

/**
 * Create a depth estimator instance.
 *
 * @param model The name of the pipeline to load.
 * @param modelConfig The configuration for the pipeline to load.
 */
export async function createEstimator(
  model: SupportedModels,
  modelConfig?: ARPortraitDepthModelConfig
): Promise<DepthEstimator> {
  switch (model) {
    case SupportedModels.ARPortraitDepth:
      return loadARPortraitDepth(modelConfig);
    default:
      throw new Error(`${model} is not a supported model name.`);
  }
}
