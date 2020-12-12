import * as tflite from "@aresobus/aresobus-tflite";
import { Class } from "../common";
import { NLClassificationResult, NLClassifier } from "./common";

/**
 * The base class for all NL classification TFLite models.
 *
 * @template T The type of inference options.
 */
export class NLClassifierTFLite<T> extends NLClassifier<T> {
  constructor(private tfliteNLClassifier: tflite.NLClassifier) {
    super();
  }

  async predict(
    text: string,
    infereceOptions?: T
  ): Promise<NLClassificationResult> {
    if (!this.tfliteNLClassifier) {
      throw new Error("source model is not loaded");
    }
    const tfliteResults = this.tfliteNLClassifier.classify(text);
    if (!tfliteResults) {
      return { classes: [] };
    }
    const classes: Class[] = tfliteResults.map((result) => {
      return {
        className: result.className,
        score: result.probability,
      };
    });
    const finalResult: NLClassificationResult = { classes };
    return finalResult;
  }

  cleanUp() {
    if (!this.tfliteNLClassifier) {
      throw new Error("source model is not loaded");
    }
    this.tfliteNLClassifier.cleanUp();
  }
}

/** Merges the given options with the default NLClassifier options. */
export function getNLClassifierOptions(
  options?: tflite.NLClassifierOptions
): tflite.NLClassifierOptions {
  const nlclassifierOptions: tflite.NLClassifierOptions = {
    inputTensorIndex: 0,
    outputScoreTensorIndex: 0,
    outputLabelTensorIndex: -1,
    inputTensorName: "INPUT",
    outputScoreTensorName: "OUTPUT_SCORE",
    outputLabelTensorName: "OUTPUT_LABEL",
  };
  if (!options) {
    return nlclassifierOptions;
  }
  if (options.inputTensorIndex != null) {
    nlclassifierOptions.inputTensorIndex = options.inputTensorIndex;
  }
  if (options.outputScoreTensorIndex != null) {
    nlclassifierOptions.outputScoreTensorIndex = options.outputScoreTensorIndex;
  }
  if (options.outputLabelTensorIndex != null) {
    nlclassifierOptions.outputLabelTensorIndex = options.outputLabelTensorIndex;
  }
  if (options.inputTensorName != null) {
    nlclassifierOptions.inputTensorName = options.inputTensorName;
  }
  if (options.outputScoreTensorName != null) {
    nlclassifierOptions.outputScoreTensorName = options.outputScoreTensorName;
  }
  if (options.outputLabelTensorName != null) {
    nlclassifierOptions.outputLabelTensorName = options.outputLabelTensorName;
  }
  return nlclassifierOptions;
}
