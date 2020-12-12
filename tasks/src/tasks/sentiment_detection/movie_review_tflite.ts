import * as tflite from "@aresobus/aresobus-tflite";
import { TaskModelLoader } from "../../task_model";
import { Runtime, Task } from "../common";
import { getNLClassifierOptions } from "../nl_classification/tflite_common";
import {
  SentimentDetectionBaseOptions,
  SentimentDetectionResult,
  SentimentDetector,
} from "./common";

// The global namespace type.
type TFLiteNS = typeof tflite;

const DEFAULT_THRESHOLD = 0.5;

/** Loading options. */
export interface MovieReviewTFLiteLoadingOptions
  extends SentimentDetectionBaseOptions {}

export interface MovieReviewTFLiteInferenceOptions {}

/** Loader for cocossd TFLite model. */
export class MovieReviewTFLiteLoader extends TaskModelLoader<
  TFLiteNS,
  MovieReviewTFLiteLoadingOptions,
  MovieReviewTFLite
> {
  readonly metadata = {
    name: "Lite movie review model",
    runtime: Runtime.TFLITE,
    version: "1.0.3",
    supportedTasks: [Task.SENTIMENT_DETECTION],
  };
  readonly sourceModelGlobalNamespace = "tflite";

  protected async transformSourceModel(
    sourceModelGlobal: TFLiteNS,
    loadingOptions?: MovieReviewTFLiteLoadingOptions
  ): Promise<MovieReviewTFLite> {
    const url =
      "https://storage.googleapis.com/tfweb/models/" +
      "movie_review_sentiment_classification.tflite";
    const tfliteNLClassifier = await sourceModelGlobal.NLClassifier.create(
      url,
      getNLClassifierOptions()
    );
    const threshold =
      loadingOptions && loadingOptions.threshold != null
        ? loadingOptions.threshold
        : DEFAULT_THRESHOLD;
    return new MovieReviewTFLite(tfliteNLClassifier, threshold);
  }
}

/**
 * Pre-trained Lite movie review sentiment detection model.
 *
 * It detects whether the review text is positive or negetive.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * const model = await tfTask.SentimentDetection.MovieReview.TFLite.load();
 *
 * // Run inference on a review text.
 * const result = await model.predict('This is a great movie!');
 * console.log(result.sentimentLabels);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * The model returns the prediction results of the following sentiment labels:
 *
 * - positive
 * - negative
 *
 * Refer to `tfTask.SentimentDetector` for the `predict` and `cleanUp` method,
 * and more details about the result interface.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol:
 * 'MovieReviewTFLiteLoadingOptions'},
 *   {description: 'Options for `predict`',
 * symbol: 'MovieReviewTFLiteInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Sentiment Detection', subheading: 'Models'}
 */
export class MovieReviewTFLite extends SentimentDetector<MovieReviewTFLiteInferenceOptions> {
  constructor(
    private tfliteNLClassifier: tflite.NLClassifier,
    private threshold: number
  ) {
    super();
  }

  async predict(
    text: string,
    options?: MovieReviewTFLiteInferenceOptions
  ): Promise<SentimentDetectionResult> {
    if (!this.tfliteNLClassifier) {
      throw new Error("source model is not loaded");
    }
    const tfliteResults = this.tfliteNLClassifier.classify(text);
    if (!tfliteResults) {
      return { sentimentLabels: {} };
    }

    const negativeProbability = tfliteResults[0].probability;
    const positiveProbability = tfliteResults[1].probability;
    let positiveResult: boolean | null = null;
    let negativeResult: boolean | null = null;
    if (Math.max(negativeProbability, positiveProbability) > this.threshold) {
      positiveResult = positiveProbability > negativeProbability;
      negativeResult = positiveProbability < negativeProbability;
    }
    return {
      sentimentLabels: {
        positive: {
          result: positiveResult,
          probabilities: [negativeProbability, positiveProbability],
        },
        negative: {
          result: negativeResult,
          probabilities: [positiveProbability, negativeProbability],
        },
      },
    };
  }
}

export const movieReviewTfliteLoader = new MovieReviewTFLiteLoader();
