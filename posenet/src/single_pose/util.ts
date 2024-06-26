import * as tf from "@aresobus/lightweight-models-core";
import { NUM_KEYPOINTS } from "../keypoints";
import { Vector2D } from "../types";

export function getPointsConfidence(
  heatmapScores: tf.TensorBuffer<tf.Rank.R3>,
  heatMapCoords: tf.TensorBuffer<tf.Rank.R2>
): Float32Array {
  const numKeypoints = heatMapCoords.shape[0];
  const result = new Float32Array(numKeypoints);

  for (let keypoint = 0; keypoint < numKeypoints; keypoint++) {
    const y = heatMapCoords.get(keypoint, 0);
    const x = heatMapCoords.get(keypoint, 1);
    result[keypoint] = heatmapScores.get(y, x, keypoint);
  }

  return result;
}

function getOffsetPoint(
  y: number,
  x: number,
  keypoint: number,
  offsetsBuffer: tf.TensorBuffer<tf.Rank.R3>
): Vector2D {
  return {
    y: offsetsBuffer.get(y, x, keypoint),
    x: offsetsBuffer.get(y, x, keypoint + NUM_KEYPOINTS),
  };
}

export function getOffsetVectors(
  heatMapCoordsBuffer: tf.TensorBuffer<tf.Rank.R2>,
  offsetsBuffer: tf.TensorBuffer<tf.Rank.R3>
): tf.Tensor2D {
  const result: number[] = [];

  for (let keypoint = 0; keypoint < NUM_KEYPOINTS; keypoint++) {
    const heatmapY = heatMapCoordsBuffer.get(keypoint, 0).valueOf();
    const heatmapX = heatMapCoordsBuffer.get(keypoint, 1).valueOf();

    const { x, y } = getOffsetPoint(
      heatmapY,
      heatmapX,
      keypoint,
      offsetsBuffer
    );

    result.push(y);
    result.push(x);
  }

  return tf.tensor2d(result, [NUM_KEYPOINTS, 2]);
}

export function getOffsetPoints(
  heatMapCoordsBuffer: tf.TensorBuffer<tf.Rank.R2>,
  outputStride: number,
  offsetsBuffer: tf.TensorBuffer<tf.Rank.R3>
): tf.Tensor2D {
  return tf.tidy(() => {
    const offsetVectors = getOffsetVectors(heatMapCoordsBuffer, offsetsBuffer);

    return tf.add(
      tf.cast(
        tf.mul(
          heatMapCoordsBuffer.toTensor(),
          tf.scalar(outputStride, "int32")
        ),
        "float32"
      ),
      offsetVectors
    );
  });
}
