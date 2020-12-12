import { normalizeRadians } from "./image_utils";
import { ImageSize } from "./interfaces/common_interfaces";
import { RectTransformationConfig } from "./interfaces/config_interfaces";
import { Rect } from "./interfaces/shape_interfaces";

/**
 * Performs geometric transformation to the input normalized rectangle,
 * correpsonding to input normalized rectangle respectively.
 * @param rect The normalized rectangle.
 * @param imageSize The original imageSize.
 * @param config See documentation in `RectTransformationConfig`.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/rect_transformation_calculator.cc
export function transformNormalizedRect(
  rect: Rect,
  imageSize: ImageSize,
  config: RectTransformationConfig
): Rect {
  let width = rect.width;
  let height = rect.height;
  let rotation = rect.rotation;

  if (config.rotation != null || config.rotationDegree != null) {
    rotation = computeNewRotation(rotation, config);
  }

  if (rotation === 0) {
    rect.xCenter = rect.xCenter + width * config.shiftX;
    rect.yCenter = rect.yCenter + height * config.shiftY;
  } else {
    const xShift =
      (imageSize.width * width * config.shiftX * Math.cos(rotation) -
        imageSize.height * height * config.shiftY * Math.sin(rotation)) /
      imageSize.width;
    const yShift =
      (imageSize.width * width * config.shiftX * Math.sin(rotation) +
        imageSize.height * height * config.shiftY * Math.cos(rotation)) /
      imageSize.height;
    rect.xCenter = rect.xCenter + xShift;
    rect.yCenter = rect.yCenter + yShift;
  }

  if (config.squareLong) {
    const longSide = Math.max(
      width * imageSize.width,
      height * imageSize.height
    );
    width = longSide / imageSize.width;
    height = longSide / imageSize.height;
  } else if (config.squareShort) {
    const shortSide = Math.min(
      width * imageSize.width,
      height * imageSize.height
    );
    width = shortSide / imageSize.width;
    height = shortSide / imageSize.height;
  }
  rect.width = width * config.scaleX;
  rect.height = height * config.scaleY;

  return rect;
}

export function computeNewRotation(
  rotation: number,
  config: RectTransformationConfig
): number {
  if (config.rotation != null) {
    rotation += config.rotation;
  } else if (config.rotationDegree != null) {
    rotation += (Math.PI * config.rotationDegree) / 180;
  }
  return normalizeRadians(rotation);
}
