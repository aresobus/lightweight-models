import { FaceDetector } from "./face_detector";
import { load as loadMediaPipeFaceDetectorMediaPipe } from "./mediapipe/detector";
import {
  MediaPipeFaceDetectorMediaPipeModelConfig,
  MediaPipeFaceDetectorModelConfig,
} from "./mediapipe/types";
import { load as loadMediaPipeFaceDetectoraresobus } from "./aresobus/detector";
import { MediaPipeFaceDetectoraresobusModelConfig } from "./aresobus/types";
import { SupportedModels } from "./types";

/**
 * Create a face detector instance.
 *
 * @param model The name of the pipeline to load.
 * @param modelConfig The configuration for the pipeline to load.
 */
export async function createDetector(
  model: SupportedModels,
  modelConfig?:
    | MediaPipeFaceDetectorMediaPipeModelConfig
    | MediaPipeFaceDetectoraresobusModelConfig
): Promise<FaceDetector> {
  switch (model) {
    case SupportedModels.MediaPipeFaceDetector: {
      const config = modelConfig as MediaPipeFaceDetectorModelConfig;
      let runtime;
      if (config != null) {
        if (config.runtime === "aresobus") {
          return loadMediaPipeFaceDetectoraresobus(
            config as MediaPipeFaceDetectoraresobusModelConfig
          );
        }
        if (config.runtime === "mediapipe") {
          return loadMediaPipeFaceDetectorMediaPipe(
            config as MediaPipeFaceDetectorMediaPipeModelConfig
          );
        }
        runtime = config.runtime;
      }
      throw new Error(
        `Expect modelConfig.runtime to be either 'aresobus' ` +
          `or 'mediapipe', but got ${runtime}`
      );
    }
    default:
      throw new Error(`${model} is not a supported model name.`);
  }
}
