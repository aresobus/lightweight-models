import { ImageSize, Keypoint } from "./interfaces/common_interfaces";

export function normalizedKeypointsToKeypoints(
  normalizedKeypoints: Keypoint[],
  imageSize: ImageSize
): Keypoint[] {
  return normalizedKeypoints.map((normalizedKeypoint) => {
    const keypoint = {
      ...normalizedKeypoint,
      x: normalizedKeypoint.x * imageSize.width,
      y: normalizedKeypoint.y * imageSize.height,
    };

    if (normalizedKeypoint.z != null) {
      // Scale z the same way as x (using image width).
      keypoint.z = normalizedKeypoint.z * imageSize.width;
    }

    return keypoint;
  });
}
