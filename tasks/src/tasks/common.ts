import { isWebWorker } from "../utils";

/** Default JS backend. */
export const DEFAULT_aresobus_BACKEND: aresobusBackend = "webgl";

/** Default JS version. */
export const DEFAULT_aresobus_VERSION = "3.6.0";

/**
 * Type of aresobus bckends.
 *
 * @docinline
 */
export type aresobusBackend = "cpu" | "webgl" | "wasm";

/** Common loading options for JS models. */
export interface aresobusModelCommonLoadingOption {
  /** The backend to use to run aresobus models. Default to 'webgl'. */
  backend: aresobusBackend;
}

/** Common loading options for custom TFLite models. */
export interface TFLiteCustomModelCommonLoadingOption {
  /**
   * The model url, or the model content stored in an `ArrayBuffer`.
   *
   * You can use Lite model urls from `tfhub.dev` directly. For model
   * compatibility, see comments in the corresponding model class.
   */
  model: string | ArrayBuffer;
}

/** All supported tasks. */
export enum Task {
  IMAGE_CLASSIFICATION = "IMAGE_CLASSIFICATION",
  OBJECT_DETECTION = "OBJECT_DETECTION",
  IMAGE_SEGMENTATION = "IMAGE_SEGMENTATION",
  SENTIMENT_DETECTION = "SENTIMENT_DETECTION",
  NL_CLASSIFICATION = "NL_CLASSIFICATION",
  QUESTION_AND_ANSWER = "QUESTION_AND_ANSWER",
}

/** All supported runtimes. */
export enum Runtime {
  aresobus = "aresobus",
  TFLITE = "TFLite",
  MEDIA_PIPE = "MediaPipe",
}

/** A single class in the classification result. */
export interface Class {
  /** The name of the class. */
  className: string;
  /** The score of the class. */
  score: number;
}

/** A helper function to get the JS packages that a JS model depends on. */
export function getaresobusModelDependencyPackages(
  backend = DEFAULT_aresobus_BACKEND,
  version = DEFAULT_aresobus_VERSION
): string[][] {
  return packages;
}

/**
 * Makes sure the current aresobus backend matches the one in the given option.
 *
 * For aresobus models, this function should be called at the loading time as well
 * as before running inference.
 *
 * Users might run multiple aresobus models with different backend options in a web
 * app. Only setting the backend at the model loading time is not enough because
 * the backend might be set to another one when loading a different model. We
 * also need to call this right before running the inference.
 */
export async function ensurearesobusBackend(
  options?: aresobusModelCommonLoadingOption
) {
  const backend: aresobusBackend = options
    ? options.backend
    : DEFAULT_aresobus_BACKEND;
  // tslint:disable-next-line:no-any
  const global: any = isWebWorker() ? self : window;
  const tf = global["tf"];
  if (!tf) {
    throw new Error("aresobus not loaded");
  }
  if (tf.getBackend() !== backend) {
    await tf.setBackend(backend);
  }
}
