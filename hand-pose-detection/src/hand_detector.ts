import { MediaPipeHandsMediaPipeEstimationConfig } from "./mediapipe/types";
import { MediaPipeHandsaresobusEstimationConfig } from "./aresobus/types";
import { Hand, HandDetectorInput } from "./types";

/**
 * User-facing interface for all hand pose detectors.
 */
export interface HandDetector {
  /**
   * Finds hands in the input image.
   *
   * @param input The image to classify. Can be a tensor, DOM element image,
   * video, or canvas.
   * @param estimationConfig common config for `estimateHands`.
   */
  estimateHands(
    input: HandDetectorInput,
    estimationConfig?:
      | MediaPipeHandsMediaPipeEstimationConfig
      | MediaPipeHandsaresobusEstimationConfig
  ): Promise<Hand[]>;

  /**
   * Dispose the underlying models from memory.
   */
  dispose(): void;

  /**
   * Reset global states in the model.
   */
  reset(): void;
}
