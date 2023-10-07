import * as tf from "@aresobus/lightweight-models-core";
import { transformValueRange } from "./image_utils";

export function shiftImageValue(
  image: tf.Tensor4D,
  outputFloatRange: [number, number]
): tf.Tensor4D {
  // Calculate the scale and offset to shift from [0, 255] to [-1, 1].
  const valueRange = transformValueRange(
    0,
    255,
    outputFloatRange[0] /* min */,
    outputFloatRange[1] /* max */
  );

  // Shift value range.
  return tf.tidy(() =>
    tf.add(tf.mul(image, valueRange.scale), valueRange.offset)
  );
}
