import * as tflite from "@aresobus/aresobus-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task } from "../common";
import { ImageSegmenterTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface DeeplabTFLiteLoadingOptions
  extends tflite.ImageSegmenterOptions {}

/**
 * Inference options.
 *
 * TODO: placeholder for now.
 */
export interface DeeplabTFLiteInferenceOptions {}

/** Loader for deeplab TFLite model. */
export class DeeplabTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  DeeplabTFLiteLoadingOptions,
  DeeplabTFLite
> {
  readonly metadata = {
    name: "TFLite Deeplab",
    description: "Run Deeplab image segmentation model with TFLite",
    runtime: Runtime.TFLITE,
    version: "1.0.3",
    supportedTasks: [Task.IMAGE_SEGMENTATION],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: DeeplabTFLiteLoadingOptions
  ): Promise<DeeplabTFLite> {
    const tfliteImageSegmenter = await sourceModelGlobal.ImageSegmenter.create(
      url,
      loadingOptions
    );
    return new DeeplabTFLite(tfliteImageSegmenter);
  }
}

/**
 * Pre-trained TFLite deeplab image segmentation model.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * const model = await tfTask.ImageSegmentation.Deeplab.TFLite.load();
 *
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
 * 'DeeplabTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`',
 * symbol: 'DeeplabTFLiteInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Image Segmentation', subheading: 'Models'}
 */
export class DeeplabTFLite extends ImageSegmenterTFLite<DeeplabTFLiteInferenceOptions> {}

export const deeplabTfliteLoader = new DeeplabTFLiteLoader();
