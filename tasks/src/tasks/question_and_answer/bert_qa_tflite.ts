import * as tflite from "@aresobus/aresobus-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task } from "../common";
import { QuestionAnswererTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/**
export interface BertQATFLiteLoadingOptions {}

/**
export interface BertQATFLiteInferenceOptions {}

/** Loader for Bert Q&A TFLite model. */
export class BertQATFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  BertQATFLiteLoadingOptions,
  BertQATFLite
> {
  readonly metadata = {
    name: "Lite Bert Q&A model",
    description: "Run Bert Q&A model with Lite",
    runtime: Runtime.TFLITE,
    version: "1.0.3",
    supportedTasks: [Task.QUESTION_AND_ANSWER],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: BertQATFLiteLoadingOptions
  ): Promise<BertQATFLite> {
    const url =
      "https://tfhub.dev//lite-model/" +
      "mobilebert/1/metadata/1?lite-format=tflite";
    const tfliteQa = await sourceModelGlobal.BertQuestionAnswerer.create(url);
    return new BertQATFLite(tfliteQa);
  }
}

/**
 * Pre-trained Lite Bert Q&A model.
 *
 * Usage:
 *
 * ```js
 * // Load the model.
 * const model = await tfTask.QuestionAndAnswer.BertQA.TFLite.load();
 *
 * // Run inference on an image.
 * const result = await model.predict(question, context);
 * console.log(result);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.QuestionAnswerer` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'BertQATFLiteLoadingOptions'},
 *   {description: 'Options for `predict`',
 * symbol: 'BertQATFLiteInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Question & Answer', subheading: 'Models'}
 */
export class BertQATFLite extends QuestionAnswererTFLite<BertQATFLiteInferenceOptions> {}

export const bertQaTfliteLoader = new BertQATFLiteLoader();
