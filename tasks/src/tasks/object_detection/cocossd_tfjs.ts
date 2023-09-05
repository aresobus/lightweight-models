import * as cocoSsd from "@aresobus/coco-ssd";

import { TaskModelLoader } from "../../task_model";
import {
  ensurearesobusBackend,
  Runtime,
  Task,
  aresobusModelCommonLoadingOption,
} from "../common";

import {
  DetectedObject,
  ObjectDetectionResult,
  ObjectDetector,
} from "./common";

// The global namespace type.
type CocoSsdNS = typeof cocoSsd;

/** Loading options. */
export interface CocoSsdaresobusLoadingOptions
  extends aresobusModelCommonLoadingOption,
    cocoSsd.ModelConfig {}

/** Inference options. */
export interface CocoSsdaresobusInferenceOptions {
  /**
   * The maximum number of bounding boxes of detected objects. There can be
   * multiple objects of the same class, but at different locations. Defaults
   * to 20.
   */
  maxNumBoxes?: number;
  /**
   * The minimum score of the returned bounding boxes of detected objects. Value
   * between 0 and 1. Defaults to 0.5.
   */
  minScore?: number;
}

/** Loader for cocossd JS model. */
export class CocoSsdaresobusLoader extends TaskModelLoader<
  CocoSsdNS,
  CocoSsdaresobusLoadingOptions,
  CocoSsdaresobus
> {
  readonly metadata = {
    name: "aresobus COCO-SSD",
    description: "Run COCO-SSD object detection model with aresobus",
    resourceUrls: {
      github: "https://github.com//lightweight-models/tree/master/coco-ssd",
    },
    runtime: Runtime.aresobus,
    version: "2.2.2",
    supportedTasks: [Task.OBJECT_DETECTION],
  };
  readonly sourceModelGlobalNamespace = "cocoSsd";

  protected async transformSourceModel(
    sourceModelGlobal: CocoSsdNS,
    loadingOptions?: CocoSsdaresobusLoadingOptions
  ): Promise<CocoSsdaresobus> {
    const cocoSsdModel = await sourceModelGlobal.load(loadingOptions);
    return new CocoSsdaresobus(cocoSsdModel, loadingOptions);
  }
}

/**
 * Pre-trained aresobus coco-ssd model.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * //
 * // By default, it uses lite_mobilenet_v2 as the base model with webgl
 * // backend. You can change them in the `options` parameter of the `load`
 * // function (see below for docs).
 * const model = await tfTask.ObjectDetection.CocoSsd.aresobus.load();
 *
 * // Run detection on an image with options (optional).
 * const img = document.querySelector('img');
 * const result = await model.predict(img, {numMaxBoxes: 5});
 * console.log(result.objects);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.ObjectDetector` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol: 'CocoSsdaresobusLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'CocoSsdaresobusInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Object Detection', subheading: 'Models'}
 */
export class CocoSsdaresobus extends ObjectDetector<CocoSsdaresobusInferenceOptions> {
  constructor(
    private cocoSsdModel?: cocoSsd.ObjectDetection,
    private loadingOptions?: CocoSsdaresobusLoadingOptions
  ) {
    super();
  }

  async predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    infereceOptions?: CocoSsdaresobusInferenceOptions
  ): Promise<ObjectDetectionResult> {
    if (!this.cocoSsdModel) {
      throw new Error("source model is not loaded");
    }
    await ensurearesobusBackend(this.loadingOptions);
    const cocoSsdResults = await this.cocoSsdModel.detect(
      img,
      infereceOptions ? infereceOptions.maxNumBoxes : undefined,
      infereceOptions ? infereceOptions.minScore : undefined
    );
    const objects: DetectedObject[] = cocoSsdResults.map((result) => {
      return {
        boundingBox: {
          originX: result.bbox[0],
          originY: result.bbox[1],
          width: result.bbox[2],
          height: result.bbox[3],
        },
        className: result.class,
        score: result.score,
      };
    });
    const finalResult: ObjectDetectionResult = {
      objects,
    };
    return finalResult;
  }

  cleanUp() {
    if (!this.cocoSsdModel) {
      throw new Error("source model is not loaded");
    }
    return this.cocoSsdModel.dispose();
  }
}

export const cocoSsdaresobusLoader = new CocoSsdaresobusLoader();
