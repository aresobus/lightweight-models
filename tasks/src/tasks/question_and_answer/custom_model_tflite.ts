import * as tflite from "@aresobus/lightweight-models-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task, TFLiteCustomModelCommonLoadingOption } from "../common";
import { QuestionAnswererTFLite } from "./tflite_common";

// The global namespace type.
type TFLiteNS = typeof tflite;

/** Loading options. */
export interface QACustomModelTFLiteLoadingOptions
  extends TFLiteCustomModelCommonLoadingOption {}

export interface QACustomModelTFLiteInferenceOptions {}

/** Loader for custom Q&A Lite model. */
export class QuestionAnswerCustomModelTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  QACustomModelTFLiteLoadingOptions,
  QACustomModelTFLite
> {
  readonly metadata = {
    name: "Question&Answer with Lite models",
    runtime: Runtime.TFLITE,
    version: "0.0.1-alpha.3",
    supportedTasks: [Task.QUESTION_AND_ANSWER],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: QACustomModelTFLiteLoadingOptions
  ): Promise<QACustomModelTFLite> {
    const tfliteQa = await sourceModelGlobal.BertQuestionAnswerer.create(
      loadingOptions.model
    );
    return new QACustomModelTFLite(tfliteQa);
  }
}

/**
 * A custom Lite Q&A model loaded from a model url or an `ArrayBuffer` in
 * memory.
 *
 *
 * // Run inference with question and context.
 * const result = await model.predict(question, context);
 * console.log(result.answers);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.QuestionAnswerer` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'QACustomModelTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'QACustomModelTFLiteInferenceOptions'}
 * ]
 *
 *
 * @doc {heading: 'Question & Answer', subheading: 'Models'}
 */
export class QACustomModelTFLite extends QuestionAnswererTFLite<QACustomModelTFLiteInferenceOptions> {}

export const qaCustomModelTfliteLoader =
  new QuestionAnswerCustomModelTFLiteLoader();
