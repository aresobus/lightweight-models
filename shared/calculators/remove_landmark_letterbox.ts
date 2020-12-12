import { Keypoint, Padding } from "./interfaces/common_interfaces";

/**
 * Adjusts landmark locations on a letterboxed image to the corresponding
 * locations on the same image with the letterbox removed.
 * @param rawLandmark A NormalizedLandmarkList representing landmarks on an
 * letterboxed image.
 * @param padding A `padding` representing the letterbox padding from the 4
 *     sides, left, top, right, bottom, of the letterboxed image, normalized by
 *     the letterboxed image dimensions.
 * @returns Normalized landmarks.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_letterbox_removal_calculator.cc
export function removeLandmarkLetterbox(
  rawLandmark: Keypoint[],
  padding: Padding
) {
  const left = padding.left;
  const top = padding.top;
  const leftAndRight = padding.left + padding.right;
  const topAndBottom = padding.top + padding.bottom;

  const outLandmarks = rawLandmark.map((landmark) => {
    return {
      ...landmark,
      x: (landmark.x - left) / (1 - leftAndRight),
      y: (landmark.y - top) / (1 - topAndBottom),
      z: landmark.z / (1 - leftAndRight), // Scale Z coordinate as X.
    };
  });

  return outLandmarks;
}
