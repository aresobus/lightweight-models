import { BlazePoseMediaPipeEstimationConfig } from "./blazepose_mediapipe/types";
import { BlazePosearesobusEstimationConfig } from "./blazepose_aresobus/types";
import { MoveNetEstimationConfig } from "./movenet/types";
import { PoseNetEstimationConfig } from "./posenet/types";
import { Pose, PoseDetectorInput } from "./types";

/**
 * User-facing interface for all pose detectors.
 */
export interface PoseDetector {
  /**
   * Estimate poses for an image or video frame.
   * @param image An image or video frame.
   * @param config Optional. See `EstimationConfig` for available options.
   * @param timestamp Optional. In milliseconds. This is useful when image is
   *     a tensor, which doesn't have timestamp info. Or to override timestamp
   *     in a video.
   * @returns An array of poses, each pose contains an array of `Keypoint`s.
   */
  estimatePoses(
    image: PoseDetectorInput,
    config?:
      | PoseNetEstimationConfig
      | BlazePosearesobusEstimationConfig
      | BlazePoseMediaPipeEstimationConfig
      | MoveNetEstimationConfig,
    timestamp?: number
  ): Promise<Pose[]>;

  /**
   * Dispose the underlying models from memory.
   */
  dispose(): void;

  /**
   * Reset global states in the model.
   */
  reset(): void;
}
