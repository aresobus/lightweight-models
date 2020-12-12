import { MICRO_SECONDS_TO_SECOND } from "../calculators/constants";
import { OneEuroFilterConfig } from "../calculators/interfaces/config_interfaces";
import { LowPassFilter } from "./low_pass_filter";
/**
 * OneEuroFilter.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/util/filtering/one_euro_filter.cc
// Also ref original paper:
// https://cristal.univ-lille.fr/~casiez/1euro/
export class OneEuroFilter {
  private readonly minCutOff: number;
  private readonly beta: number;
  private readonly derivateCutOff: number;
  private readonly x: LowPassFilter;
  private readonly dx: LowPassFilter;
  private readonly thresholdCutOff: number;
  private readonly thresholdBeta: number;

  private frequency: number;
  private lastTimestamp: number;

  /**
   * Constructor of `OneEuroFilter` class.
   * @param config See documentation of `OneEuroFilterConfig`.
   */
  constructor(config: OneEuroFilterConfig) {
    this.frequency = config.frequency;
    this.minCutOff = config.minCutOff;
    this.beta = config.beta;
    this.thresholdCutOff = config.thresholdCutOff;
    this.thresholdBeta = config.thresholdBeta;
    this.derivateCutOff = config.derivateCutOff;
    this.x = new LowPassFilter(this.getAlpha(this.minCutOff));
    this.dx = new LowPassFilter(this.getAlpha(this.derivateCutOff));
    this.lastTimestamp = 0;
  }

  /**
   * Applies filter to the value.
   * @param value valueToFilter.
   * @param microSeconds timestamp associated with the value (for instance,
   *     timestamp of the frame where you got value from).
   */
  apply(value: number, microSeconds: number, valueScale: number): number {
    if (value == null) {
      return value;
    }

    const $microSeconds = Math.trunc(microSeconds);
    if (this.lastTimestamp >= $microSeconds) {
      // Results are unpreditable in this case, so nothing to do but return
      // same value.
      return value;
    }

    // Update the sampling frequency based on timestamps.
    if (this.lastTimestamp !== 0 && $microSeconds !== 0) {
      this.frequency =
        1 / (($microSeconds - this.lastTimestamp) * MICRO_SECONDS_TO_SECOND);
    }
    this.lastTimestamp = $microSeconds;

    // Estimate the current variation per second.
    const dValue = this.x.hasLastRawValue()
      ? (value - this.x.lastRawValue()) * valueScale * this.frequency
      : 0;
    const edValue = this.dx.applyWithAlpha(
      dValue,
      this.getAlpha(this.derivateCutOff)
    );
    const cutOff = this.minCutOff + this.beta * Math.abs(edValue);

    const threshold =
      this.thresholdCutOff != null
        ? this.thresholdCutOff + this.thresholdBeta * Math.abs(edValue)
        : null;

    // filter the given value.
    return this.x.applyWithAlpha(value, this.getAlpha(cutOff), threshold);
  }

  private getAlpha(cutoff: number): number {
    // te = 1.0 / this.frequency
    // tau = 1.0 / (2 * Math.PI * cutoff)
    // result = 1 / (1.0 + (tau / te))
    return 1.0 / (1.0 + this.frequency / (2 * Math.PI * cutoff));
  }
}
