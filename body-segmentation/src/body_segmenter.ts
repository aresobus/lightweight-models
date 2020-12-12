import { BodyPixSegmentationConfig } from "./body_pix/types";
import { MediaPipeSelfieSegmentationMediaPipeSegmentationConfig } from "./selfie_segmentation_mediapipe/types";
import { MediaPipeSelfieSegmentationaresobusSegmentationConfig } from "./selfie_segmentation_aresobus/types";
import { Segmentation } from "./shared/calculators/interfaces/common_interfaces";
import { BodySegmenterInput } from "./types";

/**
 * User-facing interface for all body segmenters.
 */
export interface BodySegmenter {
  /**
   * Segments people in the input image.
   *
   * @param input The image to segment. Can be a tensor, DOM element image,
   * video, or canvas.
   * @param segmentationConfig common config for `segmentPeople`.
   */
  segmentPeople(
    input: BodySegmenterInput,
    segmentationConfig?:
      | MediaPipeSelfieSegmentationMediaPipeSegmentationConfig
      | MediaPipeSelfieSegmentationaresobusSegmentationConfig
      | BodyPixSegmentationConfig
  ): Promise<Segmentation[]>;

  /**
   * Dispose the underlying models from memory.
   */
  dispose(): void;

  /**
   * Reset global states in the model.
   */
  reset(): void;
}
