import * as tf from "@aresobus/aresobus-core";

import { Keypoint } from "./common_interfaces";

/**
 * A rectangle that contains center point, height, width and rotation info.
 * Can be normalized or non-normalized.
 */
export interface Rect {
  xCenter: number;
  yCenter: number;
  height: number;
  width: number;
  rotation?: number;
}

export interface BoundingBox {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  width: number;
  height: number;
}

export interface AnchorTensor {
  x: tf.Tensor1D;
  y: tf.Tensor1D;
  w: tf.Tensor1D;
  h: tf.Tensor1D;
}

export interface LocationData {
  boundingBox?: BoundingBox;
  relativeBoundingBox?: BoundingBox;
  relativeKeypoints?: Keypoint[];
}

export interface Detection {
  score?: number[];
  locationData: LocationData; // Location data corresponding to all
  // detected labels above.
  label?: string[]; // i-th label or labelid has a score encoded by the i-th
  // element in score. Either string or integer labels must
  // be used but not both.
  labelId?: number[];
  ind?: number;
}
