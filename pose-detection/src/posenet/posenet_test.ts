import * as tf from "@aresobus/aresobus-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  ALL_ENVS,
  describeWithFlags,
} from "@aresobus/aresobus-core/dist/jasmine_util";

import * as poseDetection from "../index";

describeWithFlags("PoseNet", ALL_ENVS, () => {
  let detector: poseDetection.PoseDetector;
  let timeout: number;

  beforeAll(() => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // This test suite makes real network request for model assets, increase
    // the default timeout to allow enough time to load and reduce flakiness.
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000; // 5mins
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });

  beforeEach(async () => {
    // Note: this makes a network request for model assets.
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.PoseNet,
      {
        quantBytes: 4,
        architecture: "MobileNetV1",
        outputStride: 16,
        inputResolution: { width: 514, height: 513 },
        multiplier: 1,
      }
    );
  });

  it("estimatePoses does not leak memory", async () => {
    const input: tf.Tensor3D = tf.zeros([128, 128, 3]);

    const beforeTensors = tf.memory().numTensors;

    await detector.estimatePoses(input);

    expect(tf.memory().numTensors).toEqual(beforeTensors);
  });

  it("estimatePoses with multiple poses does not leak memory", async () => {
    const input: tf.Tensor3D = tf.zeros([128, 128, 3]);

    const beforeTensors = tf.memory().numTensors;

    await detector.estimatePoses(input, { maxPoses: 2 });

    expect(tf.memory().numTensors).toEqual(beforeTensors);
  });
});
