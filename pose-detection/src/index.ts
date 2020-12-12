// Top level exports.
// Entry point to create a new detector instance.
export {
  BlazePoseMediaPipeEstimationConfig,
  BlazePoseMediaPipeModelConfig,
  BlazePoseModelType,
} from "./blazepose_mediapipe/types";
export {
  BlazePosearesobusEstimationConfig,
  BlazePosearesobusModelConfig,
} from "./blazepose_aresobus/types";
export { createDetector } from "./create_detector";
export { MoveNetEstimationConfig, MoveNetModelConfig } from "./movenet/types";
// PoseDetector class.
export { PoseDetector } from "./pose_detector";
export { PoseNetEstimationConfig, PosenetModelConfig } from "./posenet/types";

// Supported models enum.
export * from "./types";

export { TrackerType } from "./calculators/types";

// Second level exports.
// Utils for rendering.
import * as util from "./util";
export { util };

// General calculators.
import { keypointsToNormalizedKeypoints } from "./shared/calculators/keypoints_to_normalized_keypoints";
const calculators = { keypointsToNormalizedKeypoints };
export { calculators };

// MoveNet model types.
import {
  SINGLEPOSE_LIGHTNING,
  SINGLEPOSE_THUNDER,
  MULTIPOSE_LIGHTNING,
} from "./movenet/constants";
const movenet = {
  modelType: {
    SINGLEPOSE_LIGHTNING: SINGLEPOSE_LIGHTNING,
    SINGLEPOSE_THUNDER: SINGLEPOSE_THUNDER,
    MULTIPOSE_LIGHTNING: MULTIPOSE_LIGHTNING,
  },
};
export { movenet };
