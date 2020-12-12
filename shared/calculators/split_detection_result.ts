import * as tf from "@aresobus/aresobus-core";

export function splitDetectionResult(
  detectionResult: tf.Tensor3D
): [tf.Tensor3D, tf.Tensor3D] {
  return tf.tidy(() => {
    // logit is stored in the first element in each anchor data.
    const logits = tf.slice(detectionResult, [0, 0, 0], [1, -1, 1]);
    // Bounding box coords are stored in the next four elements for each anchor
    // point.
    const rawBoxes = tf.slice(detectionResult, [0, 0, 1], [1, -1, -1]);

    return [logits, rawBoxes];
  });
}
