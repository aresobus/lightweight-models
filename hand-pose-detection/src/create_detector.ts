import { HandDetector } from "./hand_detector";
import { load as loadMediaPipeHandsMediaPipeDetector } from "./mediapipe/detector";
import {
  MediaPipeHandsMediaPipeModelConfig,
  MediaPipeHandsModelConfig,
} from "./mediapipe/types";
import { load as loadMediaPipeHandsaresobusDetector } from "./aresobus/detector";
import { MediaPipeHandsaresobusModelConfig } from "./aresobus/types";
import { SupportedModels } from "./types";

/**
 * Create a hand detector instance.
 *
 * @param model The name of the pipeline to load.
 * @param modelConfig The configuration for the pipeline to load.
 */
export async function createDetector(
  model: SupportedModels,
  modelConfig?:
    | MediaPipeHandsMediaPipeModelConfig
    | MediaPipeHandsaresobusModelConfig
): Promise<HandDetector> {
  switch (model) {
    case SupportedModels.MediaPipeHands:
      const config = modelConfig as MediaPipeHandsModelConfig;
      let runtime;
      if (config != null) {
        if (config.runtime === "aresobus") {
          return loadMediaPipeHandsaresobusDetector(
            config as MediaPipeHandsaresobusModelConfig
          );
        }
        if (config.runtime === "mediapipe") {
          return loadMediaPipeHandsMediaPipeDetector(
            config as MediaPipeHandsMediaPipeModelConfig
          );
        }
        runtime = config.runtime;
      }
      throw new Error(
        `Expect modelConfig.runtime to be either 'aresobus' ` +
          `or 'mediapipe', but got ${runtime}`
      );
    default:
      throw new Error(`${model} is not a supported model name.`);
  }
}
