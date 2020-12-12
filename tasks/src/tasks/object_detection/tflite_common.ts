import * as tflite from "@aresobus/aresobus-tflite";

import {
  DetectedObject,
  ObjectDetectionResult,
  ObjectDetector,
} from "./common";

/**
 * The base class for all object detection Lite models.
 *
 * @template T The type of inference options.
 */
export class ObjectDetectorTFLite<T> extends ObjectDetector<T> {
  constructor(private tfliteObjectDetector: tflite.ObjectDetector) {
    super();
  }

  async predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    infereceOptions?: T
  ): Promise<ObjectDetectionResult> {
    if (!this.tfliteObjectDetector) {
      throw new Error("source model is not loaded");
    }
    const tfliteResults = this.tfliteObjectDetector.detect(img);
    if (!tfliteResults) {
      return { objects: [] };
    }
    const objects: DetectedObject[] = tfliteResults.map((result) => {
      return {
        boundingBox: result.boundingBox,
        className: result.classes[0].className,
        score: result.classes[0].probability,
      };
    });
    const finalResult: ObjectDetectionResult = { objects };
    return finalResult;
  }

  cleanUp() {
    if (!this.tfliteObjectDetector) {
      throw new Error("source model is not loaded");
    }
    this.tfliteObjectDetector.cleanUp();
  }
}
