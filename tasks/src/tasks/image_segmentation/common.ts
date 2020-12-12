import { TaskModel } from "../../task_model";

/**
 * The base class for all ImageSegmentation task models.
 *
 * @template IO The type of options used during the inference process. Different
 *     models have different inference options. See individual model for more
 *     details.
 *
 * @doc {heading: 'Image Segmentation', subheading: 'Base model'}
 */
export abstract class ImageSegmenter<IO> implements TaskModel {
  /**
   * Performs segmentation on the given image-like input, and returns
   * result.
   *
   * @param img The image-like element to run segmentation on.
   * @param options Inference options. Different models have different
   *     inference options. See individual model for more details.
   * @returns
   *
   * @docunpackreturn ['ImageSegmentationResult', 'Legend', 'Color']
   * @doc {heading: 'Image Segmentation', subheading: 'Base model'}
   */
  abstract predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options?: IO
  ): Promise<ImageSegmentationResult>;

  /**
   * Cleans up resources if needed.
   *
   * @doc {heading: 'Image Segmentation', subheading: 'Base model'}
   */
  cleanUp() {}
}

/**
 * A dictionary interface for recognized classes and their colors
 */
export interface Legend {
  /**
   * A map from class name to the corrsponding `Color` in the segmentation map.
   */
  [name: string]: Color;
}

export interface Color {
  /** The red color component for the label, in the [0, 255] range. */
  r: number;
  /** The green color component for the label, in the [0, 255] range. */
  g: number;
  /** The blue color component for the label, in the [0, 255] range. */
  b: number;
}

/** Image segmentation result. */
export interface ImageSegmentationResult {
  legend: Legend;
  /**
   * The width of the returned segmentation map.
   */
  width: number;
  /**
   * The height of the returned segmentation map.
   */
  height: number;
  /**
   * The colored segmentation map as `Uint8ClampedArray` which can be
   * fed into `ImageData` and mapped to a canvas.
   */
  segmentationMap: Uint8ClampedArray;
}
