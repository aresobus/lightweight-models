import { Keypoint } from "./interfaces/common_interfaces";
import { Rect } from "./interfaces/shape_interfaces";

/**
 * Projects normalized landmarks in a rectangle to its original coordinates. The
 * rectangle must also be in normalized coordinates.
 * @param landmarks A normalized Landmark list representing landmarks in a
 *     normalized rectangle.
 * @param inputRect A normalized rectangle.
 * @param config Config object has one field ignoreRotation, default to false.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
export function calculateLandmarkProjection(
  landmarks: Keypoint[],
  inputRect: Rect,
  config: { ignoreRotation: boolean } = {
    ignoreRotation: false,
  }
) {
  const outputLandmarks: Keypoint[] = [];
  for (const landmark of landmarks) {
    const x = landmark.x - 0.5;
    const y = landmark.y - 0.5;
    const angle = config.ignoreRotation ? 0 : inputRect.rotation;
    let newX = Math.cos(angle) * x - Math.sin(angle) * y;
    let newY = Math.sin(angle) * x + Math.cos(angle) * y;

    newX = newX * inputRect.width + inputRect.xCenter;
    newY = newY * inputRect.height + inputRect.yCenter;

    const newZ = landmark.z * inputRect.width; // Scale Z coordinate as x.

    const newLandmark = { ...landmark };

    newLandmark.x = newX;
    newLandmark.y = newY;
    newLandmark.z = newZ;

    outputLandmarks.push(newLandmark);
  }

  return outputLandmarks;
}
