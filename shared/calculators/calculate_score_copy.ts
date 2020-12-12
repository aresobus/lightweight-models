import { Keypoint } from "./interfaces/common_interfaces";

/**
 * A calculator to copy score between landmarks.
 *
 * Landmarks to copy from and to copy to can be of different type (normalized or
 * non-normalized), but landmarks to copy to and output landmarks should be of
 * the same type.
 * @param landmarksFrom  A list of landmarks.
 *     to copy from.
 * @param landmarksTo  A list of landmarks.
 *     to copy to.
 * @param copyScore Copy the score from the `landmarksFrom` parameter.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/visibility_copy_calculator.cc
export function calculateScoreCopy(
  landmarksFrom: Keypoint[],
  landmarksTo: Keypoint[],
  copyScore = true
): Keypoint[] {
  const outputLandmarks = [];
  for (let i = 0; i < landmarksFrom.length; i++) {
    // Create output landmark and copy all fields from the `to` landmarks
    const newLandmark = { ...landmarksTo[i] };

    // Copy score from the `from` landmark.
    if (copyScore) {
      newLandmark.score = landmarksFrom[i].score;
    }

    outputLandmarks.push(newLandmark);
  }

  return outputLandmarks;
}
