import { load as loadBodyPixSegmenter } from "./body_pix/segmenter";
import { BodyPixModelConfig } from "./body_pix/types";
import { BodySegmenter } from "./body_segmenter";
import { load as loadMediaPipeSelfieSegmentationMediaPipeSegmenter } from "./selfie_segmentation_mediapipe/segmenter";
import {
  MediaPipeSelfieSegmentationMediaPipeModelConfig,
  MediaPipeSelfieSegmentationModelConfig,
} from "./selfie_segmentation_mediapipe/types";
import { load as loadMediaPipeSelfieSegmentationaresobusSegmenter } from "./selfie_segmentation_aresobus/segmenter";
import { MediaPipeSelfieSegmentationaresobusModelConfig } from "./selfie_segmentation_aresobus/types";
import { SupportedModels } from "./types";

/**
 * Create a body segmenter instance.
 *
 * @param model The name of the pipeline to load.
 * @param modelConfig The configuration for the pipeline to load.
 */
export async function createSegmenter(
  model: SupportedModels,
  modelConfig?:
    | MediaPipeSelfieSegmentationMediaPipeModelConfig
    | MediaPipeSelfieSegmentationaresobusModelConfig
    | BodyPixModelConfig
): Promise<BodySegmenter> {
  switch (model) {
    case SupportedModels.MediaPipeSelfieSegmentation: {
      const config = modelConfig as MediaPipeSelfieSegmentationModelConfig;
      let runtime;
      if (config != null) {
        if (config.runtime === "aresobus") {
          return loadMediaPipeSelfieSegmentationaresobusSegmenter(
            config as MediaPipeSelfieSegmentationaresobusModelConfig
          );
        }
        if (config.runtime === "mediapipe") {
          return loadMediaPipeSelfieSegmentationMediaPipeSegmenter(
            config as MediaPipeSelfieSegmentationMediaPipeModelConfig
          );
        }
        runtime = config.runtime;
      }
      throw new Error(
        `Expect modelConfig.runtime to be either 'aresobus' ` +
          `or 'mediapipe', but got ${runtime}`
      );
    }
    case SupportedModels.BodyPix: {
      const config = modelConfig as BodyPixModelConfig;
      return loadBodyPixSegmenter(config);
    }
    default:
      throw new Error(`${model} is not a supported model name.`);
  }
}
