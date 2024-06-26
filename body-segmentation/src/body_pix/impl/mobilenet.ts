import * as tf from "@aresobus/lightweight-models-core";

import { BaseModel } from "./base_model";

export class MobileNet extends BaseModel {
  preprocessInput(input: tf.Tensor3D): tf.Tensor3D {
    // Normalize the pixels [0, 255] to be between [-1, 1].
    return tf.tidy(() => tf.sub(tf.div(input, 127.5), 1.0));
  }

  nameOutputResults(results: tf.Tensor3D[]) {
    const [
      offsets,
      segmentation,
      partHeatmaps,
      longOffsets,
      heatmap,
      displacementFwd,
      displacementBwd,
      partOffsets,
    ] = results;
    return {
      offsets,
      segmentation,
      partHeatmaps,
      longOffsets,
      heatmap,
      displacementFwd,
      displacementBwd,
      partOffsets,
    };
  }
}
