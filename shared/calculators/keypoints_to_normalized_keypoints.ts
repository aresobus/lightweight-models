import { ImageSize, Keypoint } from "./interfaces/common_interfaces";

export function keypointsToNormalizedKeypoints(
  keypoints: Keypoint[],
  imageSize: ImageSize
): Keypoint[] {
  return keypoints.map((keypoint) => {
    const normalizedKeypoint = {
      ...keypoint,
      x: keypoint.x / imageSize.width,
      y: keypoint.y / imageSize.height,
    };

    if (keypoint.z != null) {
      // Scale z the same way as x (using image width).
      keypoint.z = keypoint.z / imageSize.width;
    }

    return normalizedKeypoint;
  });
}
