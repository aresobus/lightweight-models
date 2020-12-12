import { TaskModel } from "../../task_model";
import { Class } from "../common";

/**
 * The base class for all ObjectDetection task models.
 *
 * @template IO The type of options used during the inference process. Different
 *     models have different inference options. See individual model for more
 *     details.
 *
 * @doc {heading: 'Object Detection', subheading: 'Base model'}
 */
export abstract class ObjectDetector<IO> implements TaskModel {
  /**
   * Detects objects on the given image-like input, and returns result.
   *
   * @param img The image-like element to detect objects on.
   * @param options Inference options. Different models have different
   *     inference options. See individual model for more details.
   * @returns
   *
   * @docunpackreturn ['ObjectDetectionResult', 'DetectedObject', 'BoundingBox',
   * 'Class']
   * @doc {heading: 'Object Detection', subheading: 'Base model'}
   */
  abstract predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options?: IO
  ): Promise<ObjectDetectionResult>;

  /**
   * Cleans up resources if needed.
   *
   * @doc {heading: 'Object Detection', subheading: 'Base model'}
   */
  cleanUp() {}
}

/** Object detection result. */
export interface ObjectDetectionResult {
  /** All detected objects. */
  objects: DetectedObject[];
}

/** A single detected object. */
export interface DetectedObject extends Class {
  /** The bounding box of the object. */
  boundingBox: BoundingBox;
}

/** A bounding box for the detected object. */
export interface BoundingBox {
  /** The X coordinate of the top-left corner of the bounding box. */
  originX: number;
  /** The Y coordinate of the top-left corner of the bounding box. */
  originY: number;
  /** The width of bounding box. */
  width: number;
  /** The height of bounding box. */
  height: number;
}
