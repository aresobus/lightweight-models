import * as tf from "@aresobus/lightweight-models-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  describeWithFlags,
  NODE_ENVS,
} from "@aresobus/lightweight-models-core/dist/jasmine_util";
import { load } from ".";

describeWithFlags("SemanticSegmentation", NODE_ENVS, () => {
  it("SemanticSegmentation should not leak", async () => {
    const model = await load();
    const x: tf.Tensor3D = tf.zeros([227, 500, 3]);
    const numOfTensorsBefore = tf.memory().numTensors;

    await model.segment(x);
    expect(tf.memory().numTensors).toEqual(numOfTensorsBefore);
  });

  it("SemanticSegmentation map has matching dimensions", async () => {
    const x: tf.Tensor3D = tf.zeros([513, 500, 3]);
    const model = await load();
    const segmentationMapTensor = await model.predict(x);
    const [height, width] = segmentationMapTensor.shape;
    expect([height, width]).toEqual([513, 500]);
  });

  it("SemanticSegmentation segment method generates valid output", async () => {
    const model = await load();
    const x: tf.Tensor3D = tf.zeros([300, 500, 3]);

    const { legend } = await model.segment(x);
    expect(Object.keys(legend)).toContain("background");
  });
});
