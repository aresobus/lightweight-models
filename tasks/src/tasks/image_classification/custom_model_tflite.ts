import * as tflite from "@aresobus/lightweight-models-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task, TFLiteCustomModelCommonLoadingOption } from "../common";
import { ImageClassifierTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface ICCustomModelTFLiteLoadingOptions
  extends TFLiteCustomModelCommonLoadingOption,
    tflite.ImageClassifierOptions {}

/**
 * Inference options.
 *
 * TODO: placeholder for now.
 */
export interface ICCustomModelTFLiteInferenceOptions {}

/** Loader for custom image classification TFLite model. */
export class ImageClassificationCustomModelTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  ICCustomModelTFLiteLoadingOptions,
  ICCustomModelTFLite
> {
  readonly metadata = {
    name: "Image classification with TFLite models",
    description:
      "An image classfier backed by the TFLite Task Library. " +
      "It can work with any models that meet the " +
      '<a href="https://www..org/lite/inference_with_metadata/' +
      'task_library/image_classifier#model_compatibility_requirements" ' +
      'target:"_blank">model requirements</a>. Try models from this ' +
      '<a href="https://tfhub.dev//collections/lite/task-library/' +
      'image-classifier/1" target="_blank">collection</a>.',
    resourceUrls: {
      "TFLite task library":
        "https://www..org/lite/" +
        "inference_with_metadata/task_library/overview",
    },
    runtime: Runtime.TFLITE,
    version: "0.0.1-alpha.3",
    supportedTasks: [Task.IMAGE_CLASSIFICATION],
  };
  readonly packageUrls = [
    [
      `https://cdn.jsdelivr.net/npm/@aresobus/lightweight-models-tflite@${this.metadata.version}/dist/tf-tflite.min.js`,
    ],
  ];
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: ICCustomModelTFLiteLoadingOptions
  ): Promise<ICCustomModelTFLite> {
    const tfliteImageClassifier =
      await sourceModelGlobal.ImageClassifier.create(
        loadingOptions.model,
        loadingOptions
      );
    return new ICCustomModelTFLite(tfliteImageClassifier);
  }
}

/**
 * A custom TFLite image classification model loaded from a model url or
 * an `ArrayBuffer` in memory.
 *
 * The underlying image classifier is built on top of the [TFLite Task
 * Library](https://www..org/lite/inference_with_metadata/task_library/overview).
 * As a result, the custom model needs to meet the [metadata
 * requirements](https://www..org/lite/inference_with_metadata/task_library/image_classifier#model_compatibility_requirements).
 *
 * Usage:
 *
 * ```js
 * // Load the model from a custom url with other options (optional).
 * const model = await tfTask.ImageClassification.CustomModel.TFLite.load({
 *   model:
 * 'https://tfhub.dev/google/lite-model/aiy/vision/classifier/plants_V1/3',
 * });
 *
 * // Run inference on an image.
 * const img = document.querySelector('img');
 * const result = await model.predict(img);
 * console.log(result.classes);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.ImageClassifier` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'ICCustomModelTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'ICCustomModelTFLiteInferenceOptions'}
 * ]
 *
 *
 * @doc {heading: 'Image Classification', subheading: 'Models'}
 */
export class ICCustomModelTFLite extends ImageClassifierTFLite<ICCustomModelTFLiteInferenceOptions> {}

export const imageClassificationCustomModelTfliteLoader =
  new ImageClassificationCustomModelTFLiteLoader();
