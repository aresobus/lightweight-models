import * as tflite from "@aresobus/lightweight-models-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task, TFLiteCustomModelCommonLoadingOption } from "../common";
import { ImageSegmenterTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface ISCustomModelTFLiteLoadingOptions
  extends TFLiteCustomModelCommonLoadingOption,
    tflite.ImageSegmenterOptions {}

export interface ISCustomModelTFLiteInferenceOptions {}

/** Loader for custom image segmentation TFLite model. */
export class ImageSegmentationCustomModelTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  ISCustomModelTFLiteLoadingOptions,
  ISCustomModelTFLite
> {
  readonly metadata = {
    name: "Image segmentation with TFLite models",
    runtime: Runtime.TFLITE,
    version: "1.0.3",
    supportedTasks: [Task.IMAGE_SEGMENTATION],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: ISCustomModelTFLiteLoadingOptions
  ): Promise<ISCustomModelTFLite> {
    const tfliteImageSegmenter = await sourceModelGlobal.ImageSegmenter.create(
      loadingOptions.model,
      loadingOptions
    );
    return new ISCustomModelTFLite(tfliteImageSegmenter);
  }
}

/**
 * A custom TFLite image segmentation model loaded from a model url or an
 * `ArrayBuffer` in memory.

 * // Run inference on an image.
 * const img = document.querySelector('img');
 * const result = await model.predict(img);
 * console.log(result);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.ImageSegmenter` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'ISCustomModelTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'ISCustomModelTFLiteInferenceOptions'}
 * ]
 *
 *
 * @doc {heading: 'Image Segmentation', subheading: 'Models'}
 */
export class ISCustomModelTFLite extends ImageSegmenterTFLite<ISCustomModelTFLiteInferenceOptions> {}

export const imageSegmenterCustomModelTfliteLoader =
  new ImageSegmentationCustomModelTFLiteLoader();
