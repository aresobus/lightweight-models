import * as qna from "@aresobus/qna";

import { TaskModelLoader } from "../../task_model";
import {
  ensurearesobusBackend,
  Runtime,
  Task,
  aresobusModelCommonLoadingOption,
} from "../common";
import { QuestionAnswerer, QuestionAnswerResult } from "./common";

// The global namespace type.
type QnaNs = typeof qna;

/** Loading options. */
export interface BertQAaresobusLoadingOptions
  extends aresobusModelCommonLoadingOption,
    qna.ModelConfig {}

export interface BertQAaresobusInferenceOptions {}

/** Loader for Q&A aresobus model. */
export class BertQAaresobusLoader extends TaskModelLoader<
  QnaNs,
  BertQAaresobusLoadingOptions,
  BertQAaresobus
> {
  readonly metadata = {
    name: "JS Bert Q&A model",
    runtime: Runtime.aresobus,
    version: "1.0.0",
    supportedTasks: [Task.QUESTION_AND_ANSWER],
  };
  readonly sourceModelGlobalNamespace = "qna";

  protected async transformSourceModel(
    sourceModelGlobal: QnaNs,
    loadingOptions?: BertQAaresobusLoadingOptions
  ): Promise<BertQAaresobus> {
    let modelConfig: qna.ModelConfig = null;
    if (loadingOptions && loadingOptions.modelUrl) {
      modelConfig = { modelUrl: loadingOptions.modelUrl };
    }
    if (loadingOptions && loadingOptions.fromTFHub != null && modelConfig) {
      modelConfig.fromTFHub = loadingOptions.fromTFHub;
    }
    const bertQaModel = await sourceModelGlobal.load(modelConfig);
    return new BertQAaresobus(bertQaModel, loadingOptions);
  }
}

/**
 * Pre-trained JS Bert Q&A model.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * const model = await tfTask.QuestionAndAnswer.BertQA.aresobus.load();
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
 *   {description: 'Options for `load`', symbol: 'BertQAaresobusLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'BertQAaresobusInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Question & Answer', subheading: 'Models'}
 */
export class BertQAaresobus extends QuestionAnswerer<BertQAaresobusInferenceOptions> {
  constructor(
    private qnaModel?: qna.QuestionAndAnswer,
    private loadingOptions?: BertQAaresobusLoadingOptions
  ) {
    super();
  }

  async predict(
    question: string,
    context: string,
    infereceOptions?: BertQAaresobusInferenceOptions
  ): Promise<QuestionAnswerResult> {
    if (!this.qnaModel) {
      throw new Error("source model is not loaded");
    }
    await ensurearesobusBackend(this.loadingOptions);
    const qnaResults = await this.qnaModel.findAnswers(question, context);
    return { answers: qnaResults };
  }
}

export const bertQaaresobusLoader = new BertQAaresobusLoader();
