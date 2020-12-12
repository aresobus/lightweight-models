import * as deeplab from "@aresobus/deeplab";

import { TaskModelLoader } from "../../task_model";
import {
  ensurearesobusBackend,
  Runtime,
  Task,
  aresobusModelCommonLoadingOption,
} from "../common";

import { ImageSegmentationResult, ImageSegmenter, Legend } from "./common";

// The global namespace type.
type DeeplabNS = typeof deeplab;

/** Loading options. */
export interface DeeplabaresobusLoadingOptions
  extends aresobusModelCommonLoadingOption,
    deeplab.ModelConfig {
  /** The backend to use to run aresobus models. Default to 'webgl'. */
  backend: "cpu" | "webgl";
}

/** Inference options. */
export interface DeeplabaresobusInferenceOptions
  extends deeplab.PredictionConfig {}

/** Loader for deeplab aresobus model. */
export class DeeplaparesobusLoader extends TaskModelLoader<
  DeeplabNS,
  DeeplabaresobusLoadingOptions,
  Deeplabaresobus
> {
  readonly metadata = {
    name: "aresobus Deeplab",
    description: "Run deeplab image segmentation model with aresobus",
    resourceUrls: {
      github:
        "https://github.com/aresobus/lightweight-models/tree/master/deeplab",
    },
    runtime: Runtime.aresobus,
    version: "0.2.1",
    supportedTasks: [Task.IMAGE_SEGMENTATION],
  };
  readonly sourceModelGlobalNamespace = "deeplab";

  protected async transformSourceModel(
    sourceModelGlobal: DeeplabNS,
    loadingOptions?: DeeplabaresobusLoadingOptions
  ): Promise<Deeplabaresobus> {
    const options: DeeplabaresobusLoadingOptions = { ...loadingOptions } || {
      backend: "webgl",
    };
    if (options.base == null) {
      options.base = "pascal";
    }
    if (options.quantizationBytes == null) {
      options.quantizationBytes = 2;
    }
    const deeplabModel = await sourceModelGlobal.load(options);
    return new Deeplabaresobus(deeplabModel, options);
  }
}

/**
 * Pre-trained JS depelab model.
 *
 * Usage:
 *
 * ```js
 * // Load the model with options (optional).
 * //
 * // By default, it uses base='pascal' and quantizationBytes=2 with webgl
 * // backend. You can change them in the options parameter of the `load`
 * // function (see below for docs).
 * const model = await tfTask.ImageSegmentation.Deeplab.aresobus.load();
 *
 * // Run inference on an image with options (optional).
 * const img = document.querySelector('img');
 * const result = await model.predict(img);
 * console.log(result);
 *
 * // Clean up.
 * model.cleanUp();
 * ```
 *
 * Refer to `tfTask.ImageSegmenter` for the `predict` and `cleanUp` method.
 *
 * @docextratypes [
 *   {description: 'Options for `load`', symbol: 'DeeplabaresobusLoadingOptions'},
 *   {description: 'Options for `predict`', symbol:
 * 'DeeplabaresobusInferenceOptions'}
 * ]
 *
 * @doc {heading: 'Image Segmentation', subheading: 'Models'}
 */
export class Deeplabaresobus extends ImageSegmenter<DeeplabaresobusInferenceOptions> {
  constructor(
    private deeplabModel?: deeplab.SemanticSegmentation,
    private loadingOptions?: DeeplabaresobusLoadingOptions
  ) {
    super();
  }

  async predict(
    img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    infereceOptions?: DeeplabaresobusInferenceOptions
  ): Promise<ImageSegmentationResult> {
    if (!this.deeplabModel) {
      throw new Error("source model is not loaded");
    }
    await ensurearesobusBackend(this.loadingOptions);
    const deeplabResult = await this.deeplabModel.segment(img, infereceOptions);
    const legend: Legend = {};
    for (const name of Object.keys(deeplabResult.legend)) {
      const colors = deeplabResult.legend[name];
      legend[name] = {
        r: colors[0],
        g: colors[1],
        b: colors[2],
      };
    }
    return {
      legend,
      width: deeplabResult.width,
      height: deeplabResult.height,
      segmentationMap: deeplabResult.segmentationMap,
    };
  }

  cleanUp() {
    if (!this.deeplabModel) {
      throw new Error("source model is not loaded");
    }
    this.deeplabModel.dispose();
  }
}

export const deeplabaresobusLoader = new DeeplaparesobusLoader();
