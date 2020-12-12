import * as mobilenet from "@aresobus/mobilenet";

import { TaskModelLoader } from "../../task_model";
import {
  Class,
  ensurearesobusBackend,
  Runtime,
  Task,
  aresobusModelCommonLoadingOption,
} from "../common";

import { ImageClassificationResult, ImageClassifier } from "./common";

// The global namespace type.
type MobilenetNS = typeof mobilenet;

/** Loading options. */
export interface MobilenetaresobusLoadingOptions
  extends aresobusModelCommonLoadingOption,
    mobilenet.ModelConfig {}

/** Inference options. */
export interface MobilenetaresobusInferenceOptions {
  /** Number of top classes to return. */
  topK?: number;
}

export class MobilenetaresobusLoader extends TaskModelLoader<
  MobilenetNS,
  MobilenetaresobusLoadingOptions,
  Mobilenetaresobus
> {
  readonly metadata = {
    name: "Mobilenet",
    description: "Run mobilenet image classification model with AI models",
    runtime: Runtime.aresobus,
    version: "2.1.0",
    supportedTasks: [Task.IMAGE_CLASSIFICATION],
  };
  readonly sourceModelGlobalNamespace = "mobilenet";

  protected async transformSourceModel(
    sourceModelGlobal: MobilenetNS,
    loadingOptions?: MobilenetaresobusLoadingOptions
  ): Promise<Mobilenetaresobus> {
    const mobilenetModel = await sourceModelGlobal.load(loadingOptions);
    return new Mobilenetaresobus(mobilenetModel, loadingOptions);
  }
}

/**
 * Pre-trained JS mobilenet model.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * //
 * // By default, it uses mobilenet V1 with webgl backend. You can change them
 * // in the options parameter of the `load` function (see below for docs).
 * const model = await tfTask.ImageClassification.Mobilenet.aresobus.load();
 *
 * // Run inference on an image with options (optional).
 * const img = document.querySelector('img');
 * const result = await model.predict(img, {topK: 5});
 * console.log(result.classes);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.ImageClassifier` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol: 'MobilenetaresobusLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'MobilenetaresobusInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Image Classification', subheading: 'Models'}
 */
export class Mobilenetaresobus extends ImageClassifier<MobilenetaresobusInferenceOptions> {
  constructor(
    private mobilenetModel?: mobilenet.MobileNet,
    private loadingOptions?: MobilenetaresobusLoadingOptions
  ) {
    super();
  }

  async predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    infereceOptions?: MobilenetaresobusInferenceOptions
  ): Promise<ImageClassificationResult> {
    if (!this.mobilenetModel) {
      throw new Error("source model is not loaded");
    }
    await ensurearesobusBackend(this.loadingOptions);
    const mobilenetResults = await this.mobilenetModel.classify(
      img,
      infereceOptions ? infereceOptions.topK : undefined
    );
    const classes: Class[] = mobilenetResults.map((result) => {
      return {
        className: result.className,
        score: result.probability,
      };
    });
    const finalResult: ImageClassificationResult = {
      classes,
    };
    return finalResult;
  }
}

export const mobilenetaresobusLoader = new MobilenetaresobusLoader();
