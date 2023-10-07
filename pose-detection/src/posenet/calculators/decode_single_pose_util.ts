import * as tf from "@aresobus/lightweight-models-core";
import { COCO_KEYPOINTS } from "../../constants";
import { Vector2D } from "../types";
import { getOffsetVectorsGPU } from "../ops/get_offset_vectors";

function mod(a: tf.Tensor1D, b: number): tf.Tensor1D {
  return tf.tidy(() => {
    const floored = tf.div(a, tf.scalar(b, "int32"));

    return tf.sub(a, tf.mul(floored, tf.scalar(b, "int32")));
  });
}

export function argmax2d(inputs: tf.Tensor3D): tf.Tensor2D {
  const [height, width, depth] = inputs.shape;

  return tf.tidy(() => {
    const reshaped = tf.reshape(inputs, [height * width, depth]);
    const coords = tf.argMax(reshaped, 0);

    const yCoords = tf.expandDims(tf.div(coords, tf.scalar(width, "int32")), 1);
    const xCoords = tf.expandDims(mod(coords as tf.Tensor1D, width), 1);

    return tf.concat([yCoords, xCoords], 1);
  }) as tf.Tensor2D;
}

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

export function getOffsetVectors(
  heatMapCoordsBuffer: tf.TensorBuffer<tf.Rank.R2>,
  offsetsBuffer: tf.TensorBuffer<tf.Rank.R3>
): tf.Tensor2D {
  const result: number[] = [];

  for (let keypoint = 0; keypoint < COCO_KEYPOINTS.length; keypoint++) {
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

  return tf.tensor2d(result, [COCO_KEYPOINTS.length, 2]);
}

function getOffsetPoint(
  y: number,
  x: number,
  keypoint: number,
  offsetsBuffer: tf.TensorBuffer<tf.Rank.R3>
): Vector2D {
  return {
    y: offsetsBuffer.get(y, x, keypoint),
    x: offsetsBuffer.get(y, x, keypoint + COCO_KEYPOINTS.length),
  };
}

export function getOffsetPointsGPU(
  heatMapCoordsBuffer: tf.Tensor<tf.Rank.R2>,
  outputStride: number,
  offsetsBuffer: tf.Tensor<tf.Rank.R3>
): tf.Tensor2D {
  return tf.tidy(() => {
    const offsetVectors = getOffsetVectorsGPU(
      heatMapCoordsBuffer,
      offsetsBuffer as tf.Tensor
    );

    return tf.add(
      tf.cast(
        tf.mul(heatMapCoordsBuffer, tf.scalar(outputStride, "int32")),
        "float32"
      ),
      offsetVectors
    );
  });
}
