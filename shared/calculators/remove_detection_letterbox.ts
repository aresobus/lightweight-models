import { Padding } from "./interfaces/common_interfaces";
import { Detection } from "./interfaces/shape_interfaces";

/**
 * Adjusts detection locations on the letterboxed image to the corresponding
 * locations on the same image with the letterbox removed (the input image to
 * the graph before image transformation).
 *
 * @param detections A list of detection boxes on an letterboxed image.
 * @param letterboxPadding A `padding` object representing the letterbox padding
 *     from the 4 sides: left, top, right, bottom, of the letterboxed image,
 *     normalized by the letterboxed image dimensions.
 * @returns detections: A list of detection boxes representing detections with
 *     their locations adjusted to the letterbox-removed (non-padded) image.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detection_letterbox_removal_calculator.cc
export function removeDetectionLetterbox(
  detections: Detection[] = [],
  letterboxPadding: Padding
): Detection[] {
  const left = letterboxPadding.left;
  const top = letterboxPadding.top;
  const leftAndRight = letterboxPadding.left + letterboxPadding.right;
  const topAndBottom = letterboxPadding.top + letterboxPadding.bottom;

  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    const relativeBoundingBox = detection.locationData.relativeBoundingBox;
    const xMin = (relativeBoundingBox.xMin - left) / (1 - leftAndRight);
    const yMin = (relativeBoundingBox.yMin - top) / (1 - topAndBottom);
    const width = relativeBoundingBox.width / (1 - leftAndRight);
    const height = relativeBoundingBox.height / (1 - topAndBottom);
    relativeBoundingBox.xMin = xMin;
    relativeBoundingBox.yMin = yMin;
    relativeBoundingBox.width = width;
    relativeBoundingBox.height = height;
    relativeBoundingBox.xMax = xMin + width;
    relativeBoundingBox.yMax = yMin + height;

    const relativeKeypoints = detection.locationData.relativeKeypoints;

    if (relativeKeypoints) {
      relativeKeypoints.forEach((keypoint) => {
        const newX = (keypoint.x - left) / (1 - leftAndRight);
        const newY = (keypoint.y - top) / (1 - topAndBottom);
        keypoint.x = newX;
        keypoint.y = newY;
      });
    }
  }

  return detections;
}
