/**

 * =============================================================================
 */

import * as tf from "@aresobus/aresobus-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  ALL_ENVS,
  describeWithFlags,
} from "@aresobus/aresobus-core/dist/jasmine_util";

import * as handpose from "./index";
import { stubbedImageVals } from "./test_util";

describeWithFlags("Handpose", ALL_ENVS, () => {
  let model: handpose.HandPose;
  beforeAll(async () => {
    // Note: this makes a network request for model assets.
    model = await handpose.load({ detectionConfidence: 0 });
  });

  it("estimateHands does not leak memory", async () => {
    const input: tf.Tensor3D = tf.zeros([128, 128, 3]);
    // Do not count tensors involved in setup.
    await model.estimateHands(input);

    let beforeTensors = tf.memory().numTensors;
    await model.estimateHands(input, false /* flipHorizontal */);

    expect(tf.memory().numTensors).toEqual(beforeTensors);

    beforeTensors = tf.memory().numTensors;

    await model.estimateHands(input, true /* flipHorizontal */);
    expect(tf.memory().numTensors).toEqual(beforeTensors);
  });

  it("estimateHands returns objects with expected properties", async () => {
    // Stubbed image contains a single hand.
    const input: tf.Tensor3D = tf.tensor3d(stubbedImageVals, [128, 128, 3]);
    await model.estimateHands(input);

    const beforeTensors = tf.memory().numTensors;
    const hands = await model.estimateHands(input);

    expect(tf.memory().numTensors).toEqual(beforeTensors);

    const hand = hands[0];

    expect(hand.boundingBox.topLeft).toBeDefined();
    expect(hand.boundingBox.bottomRight).toBeDefined();
    expect(hand.landmarks).toBeDefined();
    expect(hand.handInViewConfidence).toBeDefined();
  });
});
