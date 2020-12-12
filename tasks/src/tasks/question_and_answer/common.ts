import { TaskModel } from "../../task_model";

/**
 * The base class for all Q&A task models.
 *
 * @template IO The type of options used during the inference process. Different
 *     models have different inference options. See individual model for more
 *     details.
 *
 * @doc {heading: 'Question & Answer', subheading: 'Base model'}
 */
export abstract class QuestionAnswerer<IO> implements TaskModel {
  /**
   * Gets the answer to the given question based on the content of a given
   * passage.
   *
   * @param qeustion The question to find answer for.
   * @param context Context where the answer are looked up from.
   * @returns
   *
   * @docunpackreturn ['QuestionAnswerResult', 'Answer']
   * @doc {heading: 'Question & Answer', subheading: 'Base model'}
   */
  abstract predict(
    question: string,
    context: string,
    options?: IO
  ): Promise<QuestionAnswerResult>;

  /**
   * Cleans up resources if needed.
   *
   * @doc {heading: 'Question & Answer', subheading: 'Base model'}
   */
  cleanUp() {}
}

/** Q&A result. */
export interface QuestionAnswerResult {
  /** All predicted answers. */
  answers: Answer[];
}

/** A single answer. */
export interface Answer {
  /** The text of the answer. */
  text: string;
  /** The index of the starting character of the answer in the passage. */
  startIndex: number;
  /** The index of the last character of the answer text. */
  endIndex: number;
  /** Indicates the confident level. */
  score: number;
}
