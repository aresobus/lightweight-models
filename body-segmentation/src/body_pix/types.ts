import {
  ModelConfig as BodySegmentationModelConfig,
  SegmentationConfig,
} from "../types";
import {
  ModelConfig as BodyPixBaseModelConfig,
  MultiPersonInstanceInferenceConfig,
  PersonInferenceConfig,
} from "./impl/body_pix_model";

/**
 * BodyPix model config.
 */
export interface BodyPixModelConfig
  extends BodyPixBaseModelConfig,
    BodySegmentationModelConfig {}

/**
 * Segmentation parameters for BodyPix.
 *
 * `multiSegmentation`: If set to true, then each person is segmented in a
 * separate output, otherwise all people are segmented together in one
 * segmentation.
 *
 * `segmentBodyParts`: If set to true, then 24 body parts are segmented in
 * the output, otherwise only foreground / background binary segmentation is
 * performed.
 */
export interface BodyPixSegmentationConfig
  extends SegmentationConfig,
    MultiPersonInstanceInferenceConfig,
    PersonInferenceConfig {
  multiSegmentation: boolean;
  segmentBodyParts: boolean;
}
