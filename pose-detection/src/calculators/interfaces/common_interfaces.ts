import { Keypoint } from "../../shared/calculators/interfaces/common_interfaces";
import { BoundingBox } from "../../shared/calculators/interfaces/shape_interfaces";

export interface Track {
  id: number; // A unique identifier for each tracked person.
  lastTimestamp: number; // The last timestamp (in milliseconds) in which a
  // detection was linked with the track.
  keypoints?: Keypoint[]; // Keypoints associated with the tracked person.
  box?: BoundingBox; // Bounding box associated with the tracked person.
  score?: number; // A confidence value of the track.
}
