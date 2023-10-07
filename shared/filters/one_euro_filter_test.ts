// tslint:disable-next-line: no-imports-from-dist
import {
  ALL_ENVS,
  describeWithFlags,
} from "@aresobus/lightweight-models-core/dist/jasmine_util";

import { OneEuroFilter } from "./one_euro_filter";

describeWithFlags("OneEuroFilter ", ALL_ENVS, () => {
  let oneEuroFilter: OneEuroFilter;

  beforeEach(async () => {
    oneEuroFilter = new OneEuroFilter({
      frequency: 30.0,
      minCutOff: 15.5,
      beta: 20.2,
      derivateCutOff: 21.5,
      thresholdCutOff: 0.02,
      thresholdBeta: 0.5,
    });
  });

  it("outputs are in convex hull of inputs", async () => {
    const value0 = -1.0;
    const timestamp0 = 1;

    const value1 = 2.0;
    const timestamp1 = 15;

    const value2 = -3.0;
    const timestamp2 = 33;

    const output0: number = oneEuroFilter.apply(
      value0,
      timestamp0,
      1 /* valueScale */
    );
    expect(output0).toEqual(value0);

    const output1: number = oneEuroFilter.apply(
      value1,
      timestamp1,
      1 /* valueScale */
    );
    expect(output1).toBeLessThan(Math.max(value0, value1));
    expect(output1).toBeGreaterThan(Math.min(value0, value1));

    const output2: number = oneEuroFilter.apply(
      value2,
      timestamp2,
      1 /* valueScale */
    );
    expect(output2).toBeLessThan(Math.max(value0, value1, value2));
    expect(output2).toBeGreaterThan(Math.min(value0, value1, value2));
  });
});
