import { Keypoint } from "./interfaces/common_interfaces";
import { Rect } from "./interfaces/shape_interfaces";

/**
 * Projects world landmarks from the rectangle to original coordinates.
 *
 * World landmarks are predicted in meters rather than in pixels of the image
 * and have origin in the middle of the hips rather than in the corner of the
 * pose image (cropped with given rectangle). Thus only rotation (but not scale
 * and translation) is applied to the landmarks to transform them back to
 * original coordinates.
 * @param worldLandmarks A Landmark list representing world landmarks in the
 *     rectangle.
 * @param inputRect A normalized rectangle.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
export function calculateWorldLandmarkProjection(
  worldLandmarks: Keypoint[],
  inputRect: Rect
): Keypoint[] {
  const outputLandmarks = [];
  for (const worldLandmark of worldLandmarks) {
    const x = worldLandmark.x;
    const y = worldLandmark.y;
    const angle = inputRect.rotation;
    const newX = Math.cos(angle) * x - Math.sin(angle) * y;
    const newY = Math.sin(angle) * x + Math.cos(angle) * y;

    const newLandmark = { ...worldLandmark };

    newLandmark.x = newX;
    newLandmark.y = newY;

    outputLandmarks.push(newLandmark);
  }

  return outputLandmarks;
}
