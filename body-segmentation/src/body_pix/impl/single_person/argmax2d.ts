import * as tf from "@aresobus/lightweight-models-core";

function mod(a: tf.Tensor1D, b: number): tf.Tensor1D {
  return tf.tidy(() => {
    const floored = tf.div(a, tf.scalar(b, "int32"));

    return tf.sub(a, tf.mul(floored, tf.scalar(b, "int32")));
  });
}

export function argmax2d(inputs: tf.Tensor3D): tf.Tensor2D {
  const [height, width, depth] = inputs.shape;

  return tf.tidy(() => {
    const reshaped = tf.reshape(inputs, [height * width, depth]);
    const coords = tf.argMax(reshaped, 0);

    const yCoords = tf.expandDims(tf.div(coords, tf.scalar(width, "int32")), 1);
    const xCoords = tf.expandDims(mod(coords as tf.Tensor1D, width), 1);

    return tf.concat([yCoords, xCoords], 1);
  }) as tf.Tensor2D;
}
