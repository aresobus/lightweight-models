export type Tuple<T> = [T, T];
export type StringTuple = Tuple<string>;
export type NumberTuple = Tuple<number>;

export const PART_NAMES = [
  "nose",
  "leftEye",
  "rightEye",
  "leftEar",
  "rightEar",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
];

export const NUM_KEYPOINTS = PART_NAMES.length;

export interface NumberDict {
  [jointName: string]: number;
}

export const PART_IDS = PART_NAMES.reduce(
  (result: NumberDict, jointName, i): NumberDict => {
    result[jointName] = i;
    return result;
  },
  {}
);

const CONNECTED_PART_NAMES: StringTuple[] = [
  ["leftHip", "leftShoulder"],
  ["leftElbow", "leftShoulder"],
  ["leftElbow", "leftWrist"],
  ["leftHip", "leftKnee"],
  ["leftKnee", "leftAnkle"],
  ["rightHip", "rightShoulder"],
  ["rightElbow", "rightShoulder"],
  ["rightElbow", "rightWrist"],
  ["rightHip", "rightKnee"],
  ["rightKnee", "rightAnkle"],
  ["leftShoulder", "rightShoulder"],
  ["leftHip", "rightHip"],
];

/*
 * Define the skeleton. This defines the parent->child relationships of our
 * tree. Arbitrarily this defines the nose as the root of the tree, however
 * since we will infer the displacement for both parent->child and
 * child->parent, we can define the tree root as any node.
 */
export const POSE_CHAIN: StringTuple[] = [
  ["nose", "leftEye"],
  ["leftEye", "leftEar"],
  ["nose", "rightEye"],
  ["rightEye", "rightEar"],
  ["nose", "leftShoulder"],
  ["leftShoulder", "leftElbow"],
  ["leftElbow", "leftWrist"],
  ["leftShoulder", "leftHip"],
  ["leftHip", "leftKnee"],
  ["leftKnee", "leftAnkle"],
  ["nose", "rightShoulder"],
  ["rightShoulder", "rightElbow"],
  ["rightElbow", "rightWrist"],
  ["rightShoulder", "rightHip"],
  ["rightHip", "rightKnee"],
  ["rightKnee", "rightAnkle"],
];

export const CONNECTED_PART_INDICES = CONNECTED_PART_NAMES.map(
  ([jointNameA, jointNameB]) => [PART_IDS[jointNameA], PART_IDS[jointNameB]]
);
