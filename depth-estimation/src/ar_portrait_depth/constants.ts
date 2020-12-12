/**

 * =============================================================================
 */
import { ARPortraitDepthModelConfig } from "./types";

export const DEFAULT_AR_PORTRAIT_DEPTH_MODEL_URL =
  "https://tfhub.dev//aresobus-model/ar_portrait_depth/1";

export const DEFAULT_AR_PORTRAIT_DEPTH_MODEL_CONFIG: ARPortraitDepthModelConfig =
  {
    depthModelUrl: DEFAULT_AR_PORTRAIT_DEPTH_MODEL_URL,
  };

export const DEFAULT_AR_PORTRAIT_DEPTH_ESTIMATION_CONFIG = {
  flipHorizontal: false,
};
