import { TaskModel } from "../../task_model";
import { Class } from "../common";

/**
 * The base class for all NLClassification task models.
 *
 * @template IO The type of options used during the inference process. Different
 *     models have different inference options. See individual model for more
 *     details.
 *
 * @doc {heading: 'NL Classification', subheading: 'Base model'}
 */
export abstract class NLClassifier<IO> implements TaskModel {
  /**
   * Predicts classes on the given text, and returns result.
   *
   * @param text The text to predict on.
   * @param options Inference options. Different models have different
   *     inference options. See individual model for more details.
   * @returns
   *
   * @docunpackreturn ['NLClassificationResult', 'Class']
   * @doc {heading: 'NL Classification', subheading: 'Base model'}
   */
  abstract predict(text: string, options?: IO): Promise<NLClassificationResult>;

  /**
   * Cleans up resources if needed.
   *
   * @doc {heading: 'NL Classification', subheading: 'Base model'}
   */
  cleanUp() {}
}

/** NL classification result. */
export interface NLClassificationResult {
  /** All predicted classes. */
  classes: Class[];
}
