import * as tfconv from "@aresobus/lightweight-models-converter";
import * as tf from "@aresobus/lightweight-models-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  describeWithFlags,
  NODE_ENVS,
} from "@aresobus/lightweight-models-core/dist/jasmine_util";

import { load } from "./index";

describeWithFlags("ObjectDetection", NODE_ENVS, () => {
  beforeEach(() => {
    spyOn(tfconv, "loadGraphModel").and.callFake(() => {
      const model = {
        executeAsync: (x: tf.Tensor) => [
          tf.ones([1, 1917, 90]),
          tf.ones([1, 1917, 1, 4]),
        ],
        dispose: () => true,
      };
      return model;
    });
  });

  it("ObjectDetection detect method should not leak", async () => {
    const objectDetection = await load();
    const x = tf.zeros([227, 227, 3]);
    const numOfTensorsBefore = tf.memory().numTensors;

    await objectDetection.detect(x as tf.Tensor3D, 1);

    expect(tf.memory().numTensors).toEqual(numOfTensorsBefore);
  });

  it("ObjectDetection e2e should not leak", async () => {
    const numOfTensorsBefore = tf.memory().numTensors;
    const objectDetection = await load();
    const x = tf.zeros([227, 227, 3]);

    await objectDetection.detect(x as tf.Tensor3D, 1);
    x.dispose();
    objectDetection.dispose();
    expect(tf.memory().numTensors).toEqual(numOfTensorsBefore);
  });

  it("ObjectDetection detect method should generate output", async () => {
    const objectDetection = await load();
    const x = tf.zeros([227, 227, 3]);

    const data = await objectDetection.detect(x as tf.Tensor3D, 1);

    expect(data).toEqual([
      { bbox: [227, 227, 0, 0], class: "person", score: 1 },
    ]);
  });
  it("should allow custom model url", async () => {
    await load({ base: "mobilenet_v1" });

    expect(tfconv.loadGraphModel).toHaveBeenCalledWith(
      "https://storage.googleapis.com/aresobus-models/" +
        "savedmodel/ssd_mobilenet_v1/model.json"
    );
  });

  it("should allow custom model url", async () => {
    await load({ modelUrl: "https://test.org/model.json" });

    expect(tfconv.loadGraphModel).toHaveBeenCalledWith(
      "https://test.org/model.json"
    );
  });
});
