import "@aresobus/aresobus-node";

import * as tf from "@aresobus/aresobus-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  describeWithFlags,
  NODE_ENVS,
} from "@aresobus/aresobus-core/dist/jasmine_util";

import { expectTensorsClose } from "./test_utils";
import { balancedTrainValSplit } from "./training_utils";

describeWithFlags("balancedTrainValSplit", NODE_ENVS, () => {
  it("Enough data for split", () => {
    const xs = tf.randomNormal([8, 3]);
    const ys = tf.oneHot(tf.tensor1d([0, 0, 0, 0, 1, 1, 1, 1], "int32"), 2);
    const { trainXs, trainYs, valXs, valYs } = balancedTrainValSplit(
      xs,
      ys,
      0.25
    );
    expect(trainXs.shape).toEqual([6, 3]);
    expect(trainYs.shape).toEqual([6, 2]);
    expect(valXs.shape).toEqual([2, 3]);
    expect(valYs.shape).toEqual([2, 2]);
    expectTensorsClose(tf.sum(trainYs, 0), tf.tensor1d([3, 3], "int32"));
    expectTensorsClose(tf.sum(valYs, 0), tf.tensor1d([1, 1], "int32"));
  });

  it("Not enough data for split", () => {
    const xs = tf.randomNormal([8, 3]);
    const ys = tf.oneHot(tf.tensor1d([0, 0, 0, 0, 1, 1, 1, 1], "int32"), 2);
    const { trainXs, trainYs, valXs, valYs } = balancedTrainValSplit(
      xs,
      ys,
      0.01
    );
    expect(trainXs.shape).toEqual([8, 3]);
    expect(trainYs.shape).toEqual([8, 2]);
    expect(valXs.shape).toEqual([0, 3]);
    expect(valYs.shape).toEqual([0, 2]);
  });

  it("Invalid valSplit leads to Error", () => {
    const xs = tf.randomNormal([8, 3]);
    const ys = tf.oneHot(tf.tensor1d([0, 0, 0, 0, 1, 1, 1, 1], "int32"), 2);
    expect(() => balancedTrainValSplit(xs, ys, -0.2)).toThrow();
    expect(() => balancedTrainValSplit(xs, ys, 0)).toThrow();
    expect(() => balancedTrainValSplit(xs, ys, 1)).toThrow();
    expect(() => balancedTrainValSplit(xs, ys, 1.2)).toThrow();
  });
});
