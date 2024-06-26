import { TaskModel } from "../../task_model";
import { Class } from "../common";

/**
 * The base class for all ImageClassification task models.
 *
 * @template IO The type of options used during the inference process. Different
 *     models have different inference options. See individual model for more
 *     details.
 *
 * @doc {heading: 'Image Classification', subheading: 'Base model'}
 */
export abstract class ImageClassifier<IO> implements TaskModel {
  /**
   * Performs classification on the given image-like input, and returns
   * result.
   *
   * @param img The image-like element to run classification on.
   * @param options Inference options. Different models have different
   *     inference options. See individual model for more details.
   * @returns
   *
   * @docunpackreturn ['ImageClassificationResult', 'Class']
   * @doc {heading: 'Image Classification', subheading: 'Base model'}
   */
  abstract predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options?: IO
  ): Promise<ImageClassificationResult>;

  /**
   * Cleans up resources if needed.
   *
   * @doc {heading: 'Image Classification', subheading: 'Base model'}
   */
  cleanUp() {}
}

/** Image classification result. */
export interface ImageClassificationResult {
  /** All predicted classes. */
  classes: Class[];
}
