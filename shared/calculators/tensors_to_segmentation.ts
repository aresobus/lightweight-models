import * as tf from "@aresobus/lightweight-models-core";
import { ImageSize } from "./interfaces/common_interfaces";

import { TensorsToSegmentationConfig } from "./interfaces/config_interfaces";

/**
 * Converts a tensor from a segmentation model to an image mask.
 * @param segmentationTensor Output from segmentation model of shape (1, height,
 *     width, channels).
 * @param config Contains activation to apply.
 * @param outputSize Desired dimensions of output image mask.
 *
 * @returns Image mask.
 */
export function tensorsToSegmentation(
  segmentationTensor: tf.Tensor4D,
  config: TensorsToSegmentationConfig,
  outputSize?: ImageSize
): tf.Tensor2D {
  return tf.tidy(() => {
    // Remove batch dimension.
    const $segmentationTensor =
      // tslint:disable-next-line: no-unnecessary-type-assertion
      tf.squeeze(segmentationTensor, [0]) as tf.Tensor3D;

    const tensorChannels = $segmentationTensor.shape[2];
    // Process mask tensor and apply activation function.
    if (tensorChannels === 1) {
      // Create initial working mask.
      let smallMaskMat = $segmentationTensor;
      switch (config.activation) {
        case "none":
          break;
        case "sigmoid":
          smallMaskMat = tf.sigmoid(smallMaskMat);
          break;
        case "softmax":
          throw new Error("Softmax activation requires two channels.");
        default:
          throw new Error(`Activation not supported (${config.activation})`);
      }

      const outputMat = outputSize
        ? tf.image.resizeBilinear(smallMaskMat, [
            outputSize.height,
            outputSize.width,
          ])
        : smallMaskMat;

      // Remove channel dimension.
      return tf.squeeze(outputMat, [2]);
    } else {
      throw new Error(
        `Unsupported number of tensor channels ${tensorChannels}`
      );
    }
  });
}
