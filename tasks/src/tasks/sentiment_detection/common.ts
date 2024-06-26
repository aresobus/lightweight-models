import { TaskModel } from "../../task_model";

/**
 * The base class for all SentimentDetection task models.
 *
 * @template IO The type of options used during the inference process. Different
 *     models have different inference options. See individual model for more
 *     details.
 *
 * @doc {heading: 'Sentiment Detection', subheading: 'Base model'}
 */
export abstract class SentimentDetector<IO> implements TaskModel {
  /**
   * Detects sentiment on the given text, and returns result.
   *
   * @param text The text to detect sentiment on.
   * @param options Inference options. Different models have different
   *     inference options. See individual model for more details.
   * @returns
   *
   * @docunpackreturn ['SentimentDetectionResult', 'Sentiment']
   * @doc {heading: 'Sentiment Detection', subheading: 'Base model'}
   */
  abstract predict(
    text: string,
    options?: IO
  ): Promise<SentimentDetectionResult>;

  /**
   * Cleans up resources if needed.
   *
   * @doc {heading: 'Sentiment Detection', subheading: 'Base model'}
   */
  cleanUp() {}
}

/** Sentiment detection result. */
export interface SentimentDetectionResult {
  /**
   * A map from sentiment labels to their detection result along with the raw
   * probabilities ([negative probability, positive probability]).
   *
   * For example:
   * {
   *   'insult': {result: true, probabilities: [0.3, 0.7]}
   *   'threat': {result: false, probabilities: [0.7, 0.3]}
   * }
   */
  sentimentLabels: { [label: string]: Sentiment };
}

/** Detailed detection result for a certain sentiment label. */
export interface Sentiment {
  /**
   * Whether the sentiment is considered true or false. It is set to null when
   * the result cannot be determined (e.g. below a threshold).
   */
  result: boolean | null;
  /** The raw probabilities for this sentiment.  */
  probabilities: number[];
}

export interface SentimentDetectionBaseOptions {
  /**
   * A prediction is considered valid only if its confidence exceeds the
   * threshold. Defaults to 0.65.
   */
  threshold?: number;
}
