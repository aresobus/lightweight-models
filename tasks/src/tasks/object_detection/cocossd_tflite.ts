import * as tflite from "@aresobus/aresobus-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task } from "../common";
import { ObjectDetectorTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface CocoSsdTFLiteLoadingOptions
  extends tflite.ObjectDetectorOptions {}

/**
 * Inference options.
 *
 * TODO: placeholder for now.
 */
export interface CocoSsdTFLiteInferenceOptions {}

/** Loader for cocossd TFLite model. */
export class CocoSsdTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  CocoSsdTFLiteLoadingOptions,
  CocoSsdTFLite
> {
  readonly metadata = {
    name: "TFLite COCO-SSD",
    description: "Run COCO-SSD object detection model with TFLite",
    runtime: Runtime.TFLITE,
    version: "0.0.1-alpha.3",
    supportedTasks: [Task.OBJECT_DETECTION],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: CocoSsdTFLiteLoadingOptions
  ): Promise<CocoSsdTFLite> {
    const url =
      "https://tfhub.dev//lite-model/" +
      "ssd_mobilenet_v1/1/metadata/2?lite-format=tflite";
    const tfliteObjectDetector = await sourceModelGlobal.ObjectDetector.create(
      url,
      loadingOptions
    );
    return new CocoSsdTFLite(tfliteObjectDetector);
  }
}

/**
 * Pre-trained Lite coco-ssd object detection model.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * const model = await tfTask.ObjectDetection.CocoSsd.TFLite.load();
 *
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
 * 'CocoSsdTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`',
 * symbol: 'CocoSsdTFLiteInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Object Detection', subheading: 'Models'}
 */
export class CocoSsdTFLite extends ObjectDetectorTFLite<CocoSsdTFLiteInferenceOptions> {}

export const cocoSsdTfliteLoader = new CocoSsdTFLiteLoader();
