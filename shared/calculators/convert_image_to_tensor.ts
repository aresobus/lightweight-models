import * as tf from "@aresobus/lightweight-models-core";

import { Matrix4x4 } from "./calculate_inverse_matrix";
import { getRotatedSubRectToRectTransformMatrix } from "./get_rotated_sub_rect_to_rect_transformation_matrix";
import {
  getImageSize,
  getProjectiveTransformMatrix,
  getRoi,
  padRoi,
  toImageTensor,
} from "./image_utils";
import { Padding, PixelInput } from "./interfaces/common_interfaces";
import { ImageToTensorConfig } from "./interfaces/config_interfaces";
import { Rect } from "./interfaces/shape_interfaces";
import { shiftImageValue } from "./shift_image_value";

/**
 * Convert an image or part of it to an image tensor.
 *
 * @param image An image, video frame or image tensor.
 * @param config
 *      inputResolution: The target height and width.
 *      keepAspectRatio?: Whether target tensor should keep aspect ratio.
 * @param normRect A normalized rectangle, representing the subarea to crop from
 *      the image. If normRect is provided, the returned image tensor represents
 *      the subarea.
 * @returns A map with the following properties:
 *     - imageTensor
 *     - padding: Padding ratio of left, top, right, bottom, based on the output
 * dimensions.
 *     - transformationMatrix: Projective transform matrix used to transform
 * input image to transformed image.
 */
export function convertImageToTensor(
  image: PixelInput,
  config: ImageToTensorConfig,
  normRect?: Rect
): {
  imageTensor: tf.Tensor4D;
  padding: Padding;
  transformationMatrix: Matrix4x4;
} {
  const {
    outputTensorSize,
    keepAspectRatio,
    borderMode,
    outputTensorFloatRange,
  } = config;

  // Ref:
  // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_calculator.cc
  const imageSize = getImageSize(image);
  const roi = getRoi(imageSize, normRect);
  const padding = padRoi(roi, outputTensorSize, keepAspectRatio);
  const transformationMatrix = getRotatedSubRectToRectTransformMatrix(
    roi,
    imageSize.width,
    imageSize.height,
    false
  );

  const imageTensor = tf.tidy(() => {
    const $image = toImageTensor(image);

    const transformMatrix = tf.tensor2d(
      getProjectiveTransformMatrix(
        transformationMatrix,
        imageSize,
        outputTensorSize
      ),
      [1, 8]
    );

    const fillMode = borderMode === "zero" ? "constant" : "nearest";

    const imageTransformed = tf.image.transform(
      // tslint:disable-next-line: no-unnecessary-type-assertion
      tf.expandDims(tf.cast($image, "float32")) as tf.Tensor4D,
      transformMatrix,
      "bilinear",
      fillMode,
      0,
      [outputTensorSize.height, outputTensorSize.width]
    );

    const imageShifted =
      outputTensorFloatRange != null
        ? shiftImageValue(imageTransformed, outputTensorFloatRange)
        : imageTransformed;

    return imageShifted;
  });

  return { imageTensor, padding, transformationMatrix };
}
