/**

 * =============================================================================
 */

import * as tf from "@aresobus/lightweight-models-core";

// The hand bounding box.
export type Box = {
  startPoint: [number, number];
  endPoint: [number, number];
  palmLandmarks?: Array<[number, number]>;
};

export function getBoxSize(box: Box): [number, number] {
  return [
    Math.abs(box.endPoint[0] - box.startPoint[0]),
    Math.abs(box.endPoint[1] - box.startPoint[1]),
  ];
}

export function getBoxCenter(box: Box): [number, number] {
  return [
    box.startPoint[0] + (box.endPoint[0] - box.startPoint[0]) / 2,
    box.startPoint[1] + (box.endPoint[1] - box.startPoint[1]) / 2,
  ];
}

export function cutBoxFromImageAndResize(
  box: Box,
  image: tf.Tensor4D,
  cropSize: [number, number]
): tf.Tensor4D {
  const h = image.shape[1];
  const w = image.shape[2];

  const boxes = [
    [
      box.startPoint[1] / h,
      box.startPoint[0] / w,
      box.endPoint[1] / h,
      box.endPoint[0] / w,
    ],
  ];

  return tf.image.cropAndResize(image, boxes, [0], cropSize);
}

export function scaleBoxCoordinates(box: Box, factor: [number, number]): Box {
  const startPoint: [number, number] = [
    box.startPoint[0] * factor[0],
    box.startPoint[1] * factor[1],
  ];
  const endPoint: [number, number] = [
    box.endPoint[0] * factor[0],
    box.endPoint[1] * factor[1],
  ];
  const palmLandmarks: Array<[number, number]> = box.palmLandmarks.map(
    (coord: [number, number]) => {
      const scaledCoord: [number, number] = [
        coord[0] * factor[0],
        coord[1] * factor[1],
      ];
      return scaledCoord;
    }
  );

  return { startPoint, endPoint, palmLandmarks };
}

export function enlargeBox(box: Box, factor = 1.5): Box {
  const center = getBoxCenter(box);
  const size = getBoxSize(box);

  const newHalfSize = [(factor * size[0]) / 2, (factor * size[1]) / 2];
  const startPoint: [number, number] = [
    center[0] - newHalfSize[0],
    center[1] - newHalfSize[1],
  ];
  const endPoint: [number, number] = [
    center[0] + newHalfSize[0],
    center[1] + newHalfSize[1],
  ];

  return { startPoint, endPoint, palmLandmarks: box.palmLandmarks };
}

export function squarifyBox(box: Box): Box {
  const centers = getBoxCenter(box);
  const size = getBoxSize(box);
  const maxEdge = Math.max(...size);

  const halfSize = maxEdge / 2;
  const startPoint: [number, number] = [
    centers[0] - halfSize,
    centers[1] - halfSize,
  ];
  const endPoint: [number, number] = [
    centers[0] + halfSize,
    centers[1] + halfSize,
  ];

  return { startPoint, endPoint, palmLandmarks: box.palmLandmarks };
}

export function shiftBox(box: Box, shiftFactor: [number, number]) {
  const boxSize = [
    box.endPoint[0] - box.startPoint[0],
    box.endPoint[1] - box.startPoint[1],
  ];
  const shiftVector = [
    boxSize[0] * shiftFactor[0],
    boxSize[1] * shiftFactor[1],
  ];
  const startPoint: [number, number] = [
    box.startPoint[0] + shiftVector[0],
    box.startPoint[1] + shiftVector[1],
  ];
  const endPoint: [number, number] = [
    box.endPoint[0] + shiftVector[0],
    box.endPoint[1] + shiftVector[1],
  ];

  return { startPoint, endPoint, palmLandmarks: box.palmLandmarks };
}
