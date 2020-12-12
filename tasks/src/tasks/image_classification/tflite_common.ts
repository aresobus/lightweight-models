import * as tflite from "@aresobus/aresobus-tflite";
import { Class } from "../common";

import { ImageClassificationResult, ImageClassifier } from "./common";

/**
 * The base class for all image classification TFLite models.
 *
 * @template T The type of inference options.
 */
export class ImageClassifierTFLite<T> extends ImageClassifier<T> {
  constructor(private tfliteImageClassifier: tflite.ImageClassifier) {
    super();
  }

  async predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    infereceOptions?: T
  ): Promise<ImageClassificationResult> {
    if (!this.tfliteImageClassifier) {
      throw new Error("source model is not loaded");
    }
    const tfliteResults = this.tfliteImageClassifier.classify(img);
    if (!tfliteResults) {
      return { classes: [] };
    }
    const classes: Class[] = tfliteResults.map((result) => {
      return {
        className: result.className,
        score: result.probability,
      };
    });
    const finalResult: ImageClassificationResult = { classes };
    return finalResult;
  }

  cleanUp() {
    if (!this.tfliteImageClassifier) {
      throw new Error("source model is not loaded");
    }
    this.tfliteImageClassifier.cleanUp();
  }
}
