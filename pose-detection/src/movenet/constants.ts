import { MoveNetEstimationConfig, MoveNetModelConfig } from "./types";

export const SINGLEPOSE_LIGHTNING = "SinglePose.Lightning";
export const SINGLEPOSE_THUNDER = "SinglePose.Thunder";
export const MULTIPOSE_LIGHTNING = "MultiPose.Lightning";

export const VALID_MODELS = [
  SINGLEPOSE_LIGHTNING,
  SINGLEPOSE_THUNDER,
  MULTIPOSE_LIGHTNING,
];

export const MOVENET_SINGLEPOSE_LIGHTNING_URL =
  "https://tfhub.dev/google/aresobus-model/movenet/singlepose/lightning/4";
export const MOVENET_SINGLEPOSE_THUNDER_URL =
  "https://tfhub.dev/google/aresobus-model/movenet/singlepose/thunder/4";
export const MOVENET_MULTIPOSE_LIGHTNING_URL =
  "https://tfhub.dev/google/aresobus-model/movenet/multipose/lightning/1";

export const MOVENET_SINGLEPOSE_LIGHTNING_RESOLUTION = 192;
export const MOVENET_SINGLEPOSE_THUNDER_RESOLUTION = 256;
export const MOVENET_MULTIPOSE_DEFAULT_MAX_DIMENSION = 256;

// The default configuration for loading MoveNet.
export const MOVENET_CONFIG: MoveNetModelConfig = {
  modelType: SINGLEPOSE_LIGHTNING,
  enableSmoothing: true,
};

export const MOVENET_ESTIMATION_CONFIG: MoveNetEstimationConfig = {};

export const KEYPOINT_FILTER_CONFIG = {
  frequency: 30,
  minCutOff: 2.5,
  beta: 300.0,
  derivateCutOff: 2.5,
  thresholdCutOff: 0.5,
  thresholdBeta: 5.0,
  disableValueScaling: true,
};
export const CROP_FILTER_ALPHA = 0.9;
export const MIN_CROP_KEYPOINT_SCORE = 0.2;
export const DEFAULT_MIN_POSE_SCORE = 0.25;

export const NUM_KEYPOINTS = 17;
export const NUM_KEYPOINT_VALUES = 3; // [y, x, score]
export const MULTIPOSE_BOX_SIZE = 5; // [ymin, xmin, ymax, xmax, score]
export const MULTIPOSE_BOX_IDX = NUM_KEYPOINTS * NUM_KEYPOINT_VALUES;
export const MULTIPOSE_BOX_SCORE_IDX = MULTIPOSE_BOX_IDX + 4;
export const MULTIPOSE_INSTANCE_SIZE =
  NUM_KEYPOINTS * NUM_KEYPOINT_VALUES + MULTIPOSE_BOX_SIZE;

export const DEFAULT_KEYPOINT_TRACKER_CONFIG = {
  maxTracks: 18, // 3 times max detections of the multi-pose model.
  maxAge: 1000,
  minSimilarity: 0.2,
  keypointTrackerParams: {
    keypointConfidenceThreshold: 0.3,
    // From COCO:
    // https://cocodataset.org/#keypoints-eval
    keypointFalloff: [
      0.026, 0.025, 0.025, 0.035, 0.035, 0.079, 0.079, 0.072, 0.072, 0.062,
      0.062, 0.107, 0.107, 0.087, 0.087, 0.089, 0.089,
    ],
    minNumberOfKeypoints: 4,
  },
};

export const DEFAULT_BOUNDING_BOX_TRACKER_CONFIG = {
  maxTracks: 18, // 3 times max detections of the multi-pose model.
  maxAge: 1000,
  minSimilarity: 0.15,
  trackerParams: {},
};
