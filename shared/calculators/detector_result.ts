import * as tf from "@aresobus/aresobus-core";
import { splitDetectionResult } from "./split_detection_result";

export type detectorResult = {
  boxes: tf.Tensor2D;
  logits: tf.Tensor1D;
};

export function detectorResult(detectionResult: tf.Tensor3D): detectorResult {
  return tf.tidy(() => {
    const [logits, rawBoxes] = splitDetectionResult(detectionResult);
    // Shape [896, 12]
    const rawBoxes2d = tf.squeeze(rawBoxes);
    // Shape [896]
    const logits1d = tf.squeeze(logits);

    return {
      boxes: rawBoxes2d as tf.Tensor2D,
      logits: logits1d as tf.Tensor1D,
    };
  });
}
