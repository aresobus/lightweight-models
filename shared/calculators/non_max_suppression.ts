import * as tf from "@aresobus/aresobus-core";
import { Detection } from "./interfaces/shape_interfaces";

export async function nonMaxSuppression(
  detections: Detection[],
  maxDetections: number,
  iouThreshold: number,
  // Currently only IOU overap is supported.
  overlapType: "intersection-over-union"
): Promise<Detection[]> {
  // Sort to match NonMaxSuppresion calculator's decreasing detection score
  // traversal.
  // NonMaxSuppresionCalculator: RetainMaxScoringLabelOnly
  detections.sort(
    (detectionA, detectionB) =>
      Math.max(...detectionB.score) - Math.max(...detectionA.score)
  );

  const detectionsTensor = tf.tensor2d(
    detections.map((d) => [
      d.locationData.relativeBoundingBox.yMin,
      d.locationData.relativeBoundingBox.xMin,
      d.locationData.relativeBoundingBox.yMax,
      d.locationData.relativeBoundingBox.xMax,
    ])
  );
  const scoresTensor = tf.tensor1d(detections.map((d) => d.score[0]));

  const selectedIdsTensor = await tf.image.nonMaxSuppressionAsync(
    detectionsTensor,
    scoresTensor,
    maxDetections,
    iouThreshold
  );
  const selectedIds = await selectedIdsTensor.array();

  const selectedDetections = detections.filter(
    (_, i) => selectedIds.indexOf(i) > -1
  );

  tf.dispose([detectionsTensor, scoresTensor, selectedIdsTensor]);

  return selectedDetections;
}
