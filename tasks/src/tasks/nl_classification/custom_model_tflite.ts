import * as tflite from "@aresobus/aresobus-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task, TFLiteCustomModelCommonLoadingOption } from "../common";
import { getNLClassifierOptions, NLClassifierTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface NCCustomModelTFLiteLoadingOptions
  extends TFLiteCustomModelCommonLoadingOption,
    tflite.NLClassifierOptions {}

/**
 * Inference options.
 *
 * TODO: placeholder for now.
 */
export interface NCCustomModelTFLiteInferenceOptions {}

/** Loader for custom nl classification TFLite model. */
export class NLClassificationCustomModelTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  NCCustomModelTFLiteLoadingOptions,
  NCCustomModelTFLite
> {
  readonly metadata = {
    name: "Natural language classification with Lite models",
    runtime: Runtime.TFLITE,
    version: "1.0.3",
    supportedTasks: [Task.NL_CLASSIFICATION],
  };

  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: NCCustomModelTFLiteLoadingOptions
  ): Promise<NCCustomModelTFLite> {
    const tfliteNLClassifier = await sourceModelGlobal.NLClassifier.create(
      loadingOptions.model,
      getNLClassifierOptions(loadingOptions)
    );
    return new NCCustomModelTFLite(tfliteNLClassifier);
  }
}

/**
 * A custom Lite natural language classification model loaded from a model url
 * or an `ArrayBuffer` in memory.
 *
 * The underlying NL classifier is built on top of the NLClassifier in

 * Usage:
 *
 * ```js
 * // Load the model from a custom url with other options (optional).
 * const model = await tfTask.NLClassification.CustomModel.TFLite.load({
 * // Run inference on text.
 * const result = await model.predict('This is a great movie!');
 * console.log(result.classes);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.NLClassifier` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'NCCustomModelTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'NCCustomModelTFLiteInferenceOptions'}
 * ]
 *
 *
 * @doc {heading: 'NL Classification', subheading: 'Models'}
 */
export class NCCustomModelTFLite extends NLClassifierTFLite<NCCustomModelTFLiteInferenceOptions> {}

export const nlClassifierCustomModelTfliteLoader =
  new NLClassificationCustomModelTFLiteLoader();
