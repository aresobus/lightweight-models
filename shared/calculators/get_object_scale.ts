import { ImageSize } from "./interfaces/common_interfaces";
import { Rect } from "./interfaces/shape_interfaces";

/**
 * Estimate object scale to allow filter work similarly on nearer or futher
 * objects.
 * @param roi Normalized rectangle.
 * @param imageSize An object that contains width and height.
 * @returns A number representing the object scale.
 */
export function getObjectScale(roi: Rect, imageSize: ImageSize): number {
  const objectWidth = roi.width * imageSize.width;
  const objectHeight = roi.height * imageSize.height;

  return (objectWidth + objectHeight) / 2;
}
