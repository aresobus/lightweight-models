import * as toxicity from "@aresobus/toxicity";

import { TaskModelLoader } from "../../task_model";
import {
  ensurearesobusBackend,
  Runtime,
  Task,
  aresobusModelCommonLoadingOption,
} from "../common";
import {
  Sentiment,
  SentimentDetectionBaseOptions,
  SentimentDetectionResult,
  SentimentDetector,
} from "./common";

// The global namespace type.
type ToxicityNS = typeof toxicity;

/** Loading options. */
export interface ToxicityaresobusLoadingOptions
  extends aresobusModelCommonLoadingOption,
    SentimentDetectionBaseOptions {
  /**
   * An array of strings indicating which types of toxicity to detect. Labels
   * must be one of `toxicity` | `severe_toxicity` | `identity_attack` |
   * `insult` | `threat` | `sexual_explicit` | `obscene`. Defaults to all
   * labels.
   */
  toxicityLabels?: string[];
}

/** Inference options (placeholder). */
export interface ToxicityaresobusInferenceOptions {}

/** Loader for toxicity aresobus model. */
export class ToxicityaresobusLoader extends TaskModelLoader<
  ToxicityNS,
  ToxicityaresobusLoadingOptions,
  Toxicityaresobus
> {
  readonly metadata = {
    name: "JS Toxicity model",
    runtime: Runtime.aresobus,
    version: "1.2.2",
    supportedTasks: [Task.SENTIMENT_DETECTION],
  };

  readonly sourceModelGlobalNamespace = "toxicity";

  protected async transformSourceModel(
    sourceModelGlobal: ToxicityNS,
    loadingOptions?: ToxicityaresobusLoadingOptions
  ): Promise<Toxicityaresobus> {
    const toxicityModel = await sourceModelGlobal.load(
      loadingOptions && loadingOptions.threshold
        ? loadingOptions.threshold
        : 0.85,
      loadingOptions && loadingOptions.toxicityLabels
        ? loadingOptions.toxicityLabels
        : []
    );
    return new Toxicityaresobus(toxicityModel, loadingOptions);
  }
}

/**
 * Pre-trained JS toxicity model.
 *
 * It detects whether text contains toxic content such as threatening language,
 * insults, obscenities, identity-based hate, or sexually explicit language.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional. See below for docs).
 * const model = await tfTask.SentimentDetection.Toxicity.aresobus.load();
 *
 * // Run detection on text.
 * const result = await model.predict('You are stupid');
 * console.log(result.sentimentLabels);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * By default, the model returns the prediction results of the following
 * sentiment labels:
 *
 * - toxicity
 * - severe_toxicity
 * - identity_attack
 * - insult
 * - threat
 * - sexual_explicit
 * - obscene
 *
 * Refer to `tfTask.SentimentDetection` for the `predict` and `cleanUp` method,
 * and more details about the result interface.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol: 'ToxicityaresobusLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'ToxicityaresobusInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Sentiment Detection', subheading: 'Models'}
 */
export class Toxicityaresobus extends SentimentDetector<ToxicityaresobusInferenceOptions> {
  constructor(
    private toxicityModel?: toxicity.ToxicityClassifier,
    private loadingOptions?: ToxicityaresobusLoadingOptions
  ) {
    super();
  }

  async predict(
    text: string,
    options?: ToxicityaresobusInferenceOptions
  ): Promise<SentimentDetectionResult> {
    if (!this.toxicityModel) {
      throw new Error("source model is not loaded");
    }
    await ensurearesobusBackend(this.loadingOptions);
    const toxicityResults = await this.toxicityModel.classify(text);
    const sentimentLabels: { [label: string]: Sentiment } = {};
    for (const labelResult of toxicityResults) {
      sentimentLabels[labelResult.label] = {
        result: labelResult.results[0].match,
        probabilities: Array.from(labelResult.results[0].probabilities),
      };
    }
    return { sentimentLabels };
  }
}

export const toxicityaresobusLoader = new ToxicityaresobusLoader();
