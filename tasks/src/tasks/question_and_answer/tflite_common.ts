import * as tflite from "@aresobus/aresobus-tflite";
import { Answer, QuestionAnswerer, QuestionAnswerResult } from "./common";

/**
 * The base class for all Q&A Lite models.
 *
 * @template T The type of inference options.
 */
export class QuestionAnswererTFLite<T> extends QuestionAnswerer<T> {
  constructor(private tfliteQuestionAnswerer: tflite.BertQuestionAnswerer) {
    super();
  }

  async predict(
    question: string,
    context: string,
    infereceOptions?: T
  ): Promise<QuestionAnswerResult> {
    if (!this.tfliteQuestionAnswerer) {
      throw new Error("source model is not loaded");
    }
    // In Lite task library, context is the first parameter.
    const tfliteResults = this.tfliteQuestionAnswerer.answer(context, question);
    const answers: Answer[] = tfliteResults.map((result) => {
      return {
        text: result.text,
        startIndex: result.pos.start,
        endIndex: result.pos.end,
        score: result.pos.logit,
      };
    });
    return { answers };
  }

  cleanUp() {
    if (!this.tfliteQuestionAnswerer) {
      throw new Error("source model is not loaded");
    }
    this.tfliteQuestionAnswerer.cleanUp();
  }
}
