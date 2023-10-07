/**

 * =============================================================================
 */
import {
  GPGPUProgram,
  MathBackendWebGL,
} from "@aresobus/lightweight-models-backend-webgl";
import * as tf from "@aresobus/lightweight-models-core";

/**
 * A calculator for changing the background of an image to black based on
 * results of segmentation returned by bodySegmentation package.
 * @param image Input image.
 * @param segmentation Segmentation mask of foreground/background.
 *
 * @returns Masked image.
 */
export function segmentForeground(
  image: tf.Tensor3D,
  segmentation: tf.Tensor3D
): tf.Tensor3D {
  if (tf.getBackend() === "webgl") {
    // Same as implementation in the else case but in one custom shader on GPU.
    return segmentForegroundWebGL(image, segmentation);
  }
  // tf.tidy is unnecessary since this function is called within a tf.tidy
  // context.
  const [height, width, channels] = image.shape;
  // Extract red channel which stores probability
  const probability = tf.slice(segmentation, 0, [height, width, 1]);
  // Round to make a binary mask that can be multiplied with image.
  const binaryMask = tf.round(probability);
  // Make the same shape as input image.
  const imageBinaryMask = tf.tile(binaryMask, [1, 1, channels]);
  return tf.mul(image, imageBinaryMask);
}

function segmentForegroundWebGL(
  image: tf.Tensor3D,
  segmentation: tf.Tensor3D
): tf.Tensor3D {
  const program: GPGPUProgram = {
    variableNames: ["image", "segmentation"],
    outputShape: image.shape,
    userCode: `
  void main() {
      ivec3 coords = getOutputCoords();
      int height = coords[0];
      int width = coords[1];
      int channel = coords[2];
      float value = getImage(height, width, channel);
      float foregroundProbability = getSegmentation(height, width, 0);
      setOutput(foregroundProbability >= 0.5 ? value : 0.0);
    }
`,
  };
  const webglBackend = tf.backend() as MathBackendWebGL;

  const outputTensorInfo = webglBackend.compileAndRun(program, [
    image,
    segmentation,
  ]);
  return tf
    .engine()
    .makeTensorFromDataId(
      outputTensorInfo.dataId,
      outputTensorInfo.shape,
      outputTensorInfo.dtype
    ) as tf.Tensor3D;
}
