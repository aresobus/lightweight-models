import { MediaPipeFaceMeshMediaPipeEstimationConfig } from "./mediapipe/types";
import { MediaPipeFaceMesharesobusEstimationConfig } from "./aresobus/types";
import { Face, FaceLandmarksDetectorInput } from "./types";

/**
 * User-facing interface for all face pose detectors.
 */
export interface FaceLandmarksDetector {
  /**
   * Finds faces in the input image.
   *
   * @param input The image to classify. Can be a tensor, DOM element image,
   * video, or canvas.
   * @param estimationConfig common config for `estimateFaces`.
   */
  estimateFaces(
    input: FaceLandmarksDetectorInput,
    estimationConfig?:
      | MediaPipeFaceMeshMediaPipeEstimationConfig
      | MediaPipeFaceMesharesobusEstimationConfig
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
