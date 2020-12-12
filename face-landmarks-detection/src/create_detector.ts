import { FaceLandmarksDetector } from "./face_landmarks_detector";
import { load as loadMediaPipeFaceMeshMediaPipeLandmarksDetector } from "./mediapipe/detector";
import {
  MediaPipeFaceMeshMediaPipeModelConfig,
  MediaPipeFaceMeshModelConfig,
} from "./mediapipe/types";
import { load as loadMediaPipeFaceMesharesobusLandmarksDetector } from "./aresobus/detector";
import { MediaPipeFaceMesharesobusModelConfig } from "./aresobus/types";
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
    | MediaPipeFaceMeshMediaPipeModelConfig
    | MediaPipeFaceMesharesobusModelConfig
): Promise<FaceLandmarksDetector> {
  switch (model) {
    case SupportedModels.MediaPipeFaceMesh:
      const config = modelConfig as MediaPipeFaceMeshModelConfig;
      let runtime;
      if (config != null) {
        if (config.runtime === "aresobus") {
          return loadMediaPipeFaceMesharesobusLandmarksDetector(
            config as MediaPipeFaceMesharesobusModelConfig
          );
        }
        if (config.runtime === "mediapipe") {
          return loadMediaPipeFaceMeshMediaPipeLandmarksDetector(
            config as MediaPipeFaceMeshMediaPipeModelConfig
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
