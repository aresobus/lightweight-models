import { computeRotation } from "./detection_to_rect";
import { ImageSize } from "./interfaces/common_interfaces";
import { DetectionToRectConfig } from "./interfaces/config_interfaces";
import { Rect } from "./interfaces/shape_interfaces";
import { Detection } from "./interfaces/shape_interfaces";

// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/alignment_points_to_rects_calculator.cc
export function calculateAlignmentPointsRects(
  detection: Detection,
  imageSize: ImageSize,
  config: DetectionToRectConfig
): Rect {
  const startKeypoint = config.rotationVectorStartKeypointIndex;
  const endKeypoint = config.rotationVectorEndKeypointIndex;

  const locationData = detection.locationData;
  const xCenter =
    locationData.relativeKeypoints[startKeypoint].x * imageSize.width;
  const yCenter =
    locationData.relativeKeypoints[startKeypoint].y * imageSize.height;

  const xScale =
    locationData.relativeKeypoints[endKeypoint].x * imageSize.width;
  const yScale =
    locationData.relativeKeypoints[endKeypoint].y * imageSize.height;

  // Bounding box size as double distance from center to scale point.
  const boxSize =
    Math.sqrt(
      (xScale - xCenter) * (xScale - xCenter) +
        (yScale - yCenter) * (yScale - yCenter)
    ) * 2;

  const rotation = computeRotation(detection, imageSize, config);

  // Set resulting bounding box.
  return {
    xCenter: xCenter / imageSize.width,
    yCenter: yCenter / imageSize.height,
    width: boxSize / imageSize.width,
    height: boxSize / imageSize.height,
    rotation,
  };
}
