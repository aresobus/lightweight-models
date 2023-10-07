import * as tf from "@aresobus/lightweight-models-core";

import { BaseModel } from "./base_model";

const imageNetMean = [-123.15, -115.9, -103.06];

export class ResNet extends BaseModel {
  preprocessInput(input: tf.Tensor3D): tf.Tensor3D {
    return tf.add(input, imageNetMean);
  }

  nameOutputResults(results: tf.Tensor3D[]) {
    const [displacementFwd, displacementBwd, offsets, heatmap] = results;
    return { offsets, heatmap, displacementFwd, displacementBwd };
  }
}
