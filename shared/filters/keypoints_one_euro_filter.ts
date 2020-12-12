import {
  Keypoint,
  KeypointsFilter,
} from "../calculators/interfaces/common_interfaces";
import { OneEuroFilterConfig } from "../calculators/interfaces/config_interfaces";
import { OneEuroFilter } from "./one_euro_filter";

/**
 * A stateful filter that smoothes keypoints values overtime.
 *
 * More specifically, it uses `OneEuroFilter` to smooth every x, y, z
 * coordinates over time, which as result gives us velocity of how these values
 * change over time. With higher velocity it weights new values higher.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_smoothing_calculator.cc
export class KeypointsOneEuroFilter implements KeypointsFilter {
  private xFilters: OneEuroFilter[];
  private yFilters: OneEuroFilter[];
  private zFilters: OneEuroFilter[];

  constructor(private readonly config: OneEuroFilterConfig) {}

  apply(
    keypoints: Keypoint[],
    microSeconds: number,
    objectScale: number
  ): Keypoint[] {
    if (keypoints == null) {
      this.reset();
      return null;
    }

    // Initialize filters once.
    this.initializeFiltersIfEmpty(keypoints);

    // Get value scale as inverse value of the object scale.
    // If value is too small smoothing will be disabled and keypoints will be
    // returned as is.
    let valueScale = 1;
    if (!this.config.disableValueScaling) {
      if (objectScale < this.config.minAllowedObjectScale) {
        return [...keypoints];
      }
      valueScale = 1.0 / objectScale;
    }

    // Filter keypoints. Every axis of every keypoint is filtered separately.
    return keypoints.map((keypoint, i) => {
      const outKeypoint = {
        ...keypoint,
        x: this.xFilters[i].apply(keypoint.x, microSeconds, valueScale),
        y: this.yFilters[i].apply(keypoint.y, microSeconds, valueScale),
      };

      if (keypoint.z != null) {
        outKeypoint.z = this.zFilters[i].apply(
          keypoint.z,
          microSeconds,
          valueScale
        );
      }

      return outKeypoint;
    });
  }

  reset() {
    this.xFilters = null;
    this.yFilters = null;
    this.zFilters = null;
  }

  // Initializes filters for the first time or after reset. If initialized the
  // check the size.
  private initializeFiltersIfEmpty(keypoints: Keypoint[]) {
    if (this.xFilters == null || this.xFilters.length !== keypoints.length) {
      this.xFilters = keypoints.map((_) => new OneEuroFilter(this.config));
      this.yFilters = keypoints.map((_) => new OneEuroFilter(this.config));
      this.zFilters = keypoints.map((_) => new OneEuroFilter(this.config));
    }
  }
}
