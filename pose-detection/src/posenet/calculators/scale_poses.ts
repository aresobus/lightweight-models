import {
  ImageSize,
  Padding,
} from "../../shared/calculators/interfaces/common_interfaces";
import { InputResolution, Pose } from "../../types";

export function scalePoses(
  poses: Pose[],
  imageSize: ImageSize,
  inputResolution: InputResolution,
  padding: Padding
): Pose[] {
  const { height, width } = imageSize;
  const scaleY =
    height / (inputResolution.height * (1 - padding.top - padding.bottom));
  const scaleX =
    width / (inputResolution.width * (1 - padding.left - padding.right));

  const offsetY = -padding.top * inputResolution.height;
  const offsetX = -padding.left * inputResolution.width;

  if (scaleX === 1 && scaleY === 1 && offsetY === 0 && offsetX === 0) {
    return poses;
  }

  for (const pose of poses) {
    for (const kp of pose.keypoints) {
      kp.x = (kp.x + offsetX) * scaleX;
      kp.y = (kp.y + offsetY) * scaleY;
    }
  }

  return poses;
}
