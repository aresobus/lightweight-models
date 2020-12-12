import { load as loadBlazePoseMediaPipeDetector } from "./blazepose_mediapipe/detector";
import {
  BlazePoseMediaPipeModelConfig,
  BlazePoseModelConfig,
} from "./blazepose_mediapipe/types";
import { load as loadBlazePosearesobusDetector } from "./blazepose_aresobus/detector";
import { BlazePosearesobusModelConfig } from "./blazepose_aresobus/types";
import { load as loadMoveNetDetector } from "./movenet/detector";
import { MoveNetModelConfig } from "./movenet/types";
import { PoseDetector } from "./pose_detector";
import { load as loadPoseNetDetector } from "./posenet/detector";
import { PosenetModelConfig } from "./posenet/types";
import { SupportedModels } from "./types";

/**
 * Create a pose detector instance.
 *
 * @param model The name of the pipeline to load.
 */
export async function createDetector(
  model: SupportedModels,
  modelConfig?:
    | PosenetModelConfig
    | BlazePosearesobusModelConfig
    | BlazePoseMediaPipeModelConfig
    | MoveNetModelConfig
): Promise<PoseDetector> {
  switch (model) {
    case SupportedModels.PoseNet:
      return loadPoseNetDetector(modelConfig as PosenetModelConfig);
    case SupportedModels.BlazePose:
      const config = modelConfig as BlazePoseModelConfig;
      let runtime;
      if (config != null) {
        if (config.runtime === "aresobus") {
          return loadBlazePosearesobusDetector(
            modelConfig as BlazePosearesobusModelConfig
          );
        }
        if (config.runtime === "mediapipe") {
          return loadBlazePoseMediaPipeDetector(
            modelConfig as BlazePoseMediaPipeModelConfig
          );
        }
        runtime = config.runtime;
      }
      throw new Error(
        `Expect modelConfig.runtime to be either 'aresobus' ` +
          `or 'mediapipe', but got ${runtime}`
      );
    case SupportedModels.MoveNet:
      return loadMoveNetDetector(modelConfig as MoveNetModelConfig);
    default:
      throw new Error(`${model} is not a supported model name.`);
  }
}
