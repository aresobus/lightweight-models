import { ImageSize } from "../../shared/calculators/interfaces/common_interfaces";
import { Pose } from "../../types";

export function flipPosesHorizontal(
  poses: Pose[],
  imageSize: ImageSize
): Pose[] {
  for (const pose of poses) {
    for (const kp of pose.keypoints) {
      kp.x = imageSize.width - 1 - kp.x;
    }
  }

  return poses;
}
