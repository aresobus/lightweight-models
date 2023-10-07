import * as tf from "@aresobus/lightweight-models-core";

import { COCO_KEYPOINTS } from "../../constants";
import { Keypoint } from "../../shared/calculators/interfaces/common_interfaces";
import { Pose } from "../../types";
import { getPointsConfidenceGPU } from "../ops/get_points_confidence";
import { PoseNetOutputStride } from "../types";

import {
  argmax2d,
  getOffsetPoints,
  getOffsetPointsGPU,
  getPointsConfidence,
} from "./decode_single_pose_util";

/**
 * Detects a single pose and finds its parts from part scores and offset
 * vectors. It returns a single pose detection. It works as follows:
 * argmax2d is done on the scores to get the y and x index in the heatmap
 * with the highest score for each part, which is essentially where the
 * part is most likely to exist. This produces a tensor of size 17x2, with
 * each row being the y and x index in the heatmap for each keypoint.
 * The offset vector for each part is retrieved by getting the
 * y and x from the offsets corresponding to the y and x index in the
 * heatmap for that part. This produces a tensor of size 17x2, with each
 * row being the offset vector for the corresponding keypoint.
 * To get the keypoint, each part’s heatmap y and x are multiplied
 * by the output stride then added to their corresponding offset vector,
 * which is in the same scale as the original image.
 *
 * @param heatmapScores 3-D tensor with shape `[height, width, numParts]`.
 * The value of heatmapScores[y, x, k]` is the score of placing the `k`-th
 * object part at position `(y, x)`.
 *
 * @param offsets 3-D tensor with shape `[height, width, numParts * 2]`.
 * The value of [offsets[y, x, k], offsets[y, x, k + numParts]]` is the
 * short range offset vector of the `k`-th  object part at heatmap
 * position `(y, x)`.
 *
 * @param outputStride The output stride that was used when feed-forwarding
 * through the PoseNet model.  Must be 32, 16, or 8.
 *
 * @return A promise that resolves with single pose with a confidence score,
 * which contains an array of keypoints indexed by part id, each with a score
 * and position.
 */
export async function decodeSinglePose(
  heatmapScores: tf.Tensor3D,
  offsets: tf.Tensor3D,
  outputStride: PoseNetOutputStride
): Promise<Pose> {
  let totalScore = 0.0;

  const heatmapValues = argmax2d(heatmapScores);

  const allTensorBuffers = await Promise.all([
    heatmapScores.buffer(),
    offsets.buffer(),
    heatmapValues.buffer(),
  ]);

  const scoresBuffer = allTensorBuffers[0];
  const offsetsBuffer = allTensorBuffers[1];
  const heatmapValuesBuffer = allTensorBuffers[2];

  const offsetPoints = getOffsetPoints(
    heatmapValuesBuffer,
    outputStride,
    offsetsBuffer
  );
  const offsetPointsBuffer = await offsetPoints.buffer();

  const keypointConfidence = Array.from(
    getPointsConfidence(scoresBuffer, heatmapValuesBuffer)
  );

  const keypoints = keypointConfidence.map((score, keypointId): Keypoint => {
    totalScore += score;
    return {
      y: offsetPointsBuffer.get(keypointId, 0),
      x: offsetPointsBuffer.get(keypointId, 1),
      score,
      name: COCO_KEYPOINTS[keypointId],
    };
  });
  heatmapValues.dispose();
  offsetPoints.dispose();

  return { keypoints, score: totalScore / keypoints.length };
}

/**
 * Detects a single pose and finds its parts from part scores and offset
 * vectors with GPU.
 */
export async function decodeSinglePoseGPU(
  heatmapScores: tf.Tensor3D,
  offsets: tf.Tensor3D,
  outputStride: PoseNetOutputStride
): Promise<tf.Tensor[]> {
  const heatmapValues = argmax2d(heatmapScores);
  const offsetPoints = getOffsetPointsGPU(heatmapValues, outputStride, offsets);

  const keypointConfidence = getPointsConfidenceGPU(
    heatmapScores,
    heatmapValues as tf.Tensor
  );
  return [offsetPoints, keypointConfidence];
}
