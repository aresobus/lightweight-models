import { MediaPipeFaceDetectorMediaPipeEstimationConfig } from "./mediapipe/types";
import { MediaPipeFaceDetectoraresobusEstimationConfig } from "./aresobus/types";
import { Face, FaceDetectorInput } from "./types";

/**
 * User-facing interface for all face pose detectors.
 */
export interface FaceDetector {
  /**
   * Finds faces in the input image.
   *
   * @param input The image to classify. Can be a tensor, DOM element image,
   * video, or canvas.
   * @param estimationConfig common config for `estimateFaces`.
   */
  estimateFaces(
    input: FaceDetectorInput,
    estimationConfig?:
      | MediaPipeFaceDetectorMediaPipeEstimationConfig
      | MediaPipeFaceDetectoraresobusEstimationConfig
  ): Promise<Face[]>;

  /**
   * Dispose the underlying models from memory.
   */
  dispose(): void;

  /**
   * Reset global states in the model.
   */
  reset(): void;
}
