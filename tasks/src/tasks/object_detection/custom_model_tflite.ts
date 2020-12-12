import * as tflite from "@aresobus/aresobus-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task, TFLiteCustomModelCommonLoadingOption } from "../common";
import { ObjectDetectorTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface ODCustomModelTFLiteLoadingOptions
  extends TFLiteCustomModelCommonLoadingOption,
    tflite.ObjectDetectorOptions {}

/**
 * Inference options.
 *
 * TODO: placeholder for now.
 */
export interface ODCustomModelTFLiteInferenceOptions {}

/** Loader for custom object detection TFLite model. */
export class ObjectDetectionCustomModelTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  ODCustomModelTFLiteLoadingOptions,
  ODCustomModelTFLite
> {
  readonly metadata = {
    name: "Object detection with Lite models",
    runtime: Runtime.TFLITE,
    version: "1.0.3",
    supportedTasks: [Task.OBJECT_DETECTION],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: ODCustomModelTFLiteLoadingOptions
  ): Promise<ODCustomModelTFLite> {
    const tfliteObjectDetector = await sourceModelGlobal.ObjectDetector.create(
      loadingOptions.model,
      loadingOptions
    );
    return new ODCustomModelTFLite(tfliteObjectDetector);
  }
}

/**
 * A custom TFLite object detection model loaded from a model url or an
 * `ArrayBuffer` in memory.

 * // Run inference on an image.
 * const img = document.querySelector('img');
 * const result = await model.predict(img);
 * console.log(result.objects);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.ObjectDetector` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'ODCustomModelTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'ODCustomModelTFLiteInferenceOptions'}
 * ]
 *
 *
 * @doc {heading: 'Object Detection', subheading: 'Models'}
 */
export class ODCustomModelTFLite extends ObjectDetectorTFLite<ODCustomModelTFLiteInferenceOptions> {}

export const objectDetectorCustomModelTfliteLoader =
  new ObjectDetectionCustomModelTFLiteLoader();
