import * as tf from "@aresobus/aresobus-core";

/**
 * A dataset for webcam controls which allows the user to add example Tensors
 * for particular labels. This object will concat them into two large xs and ys.
 */
export class Dataset {
  xs: tf.Tensor[];
  ys: tf.Tensor;
  constructor(public numClasses: number) {}

  /**
   * Adds an example to the controller dataset.
   * @param {Tensor} example A tensor representing the example.
   *    It can be an image, an activation, or any other type of Tensor.
   * @param {number} label The label of the example. Should be an number.
   */
  addExample(example: tf.Tensor | tf.Tensor[], label: number) {
    example = Array.isArray(example) ? example : [example];
    // One-hot encode the label.
    const y = tf.tidy(() =>
      tf.oneHot(tf.tensor1d([label]).toInt(), this.numClasses)
    );

    if (this.xs == null) {
      // For the first example that gets added, keep example and y so that the
      // Dataset owns the memory of the inputs. This makes sure that
      // if addExample() is called in a tf.tidy(), these Tensors will not get
      // disposed.
      this.xs = example.map((tensor) => tf.keep(tensor));
      this.ys = tf.keep(y);
    } else {
      const oldX = this.xs;
      this.xs = example.map((tensor, index) =>
        tf.keep(this.xs[index].concat(tensor, 0))
      );

      const oldY = this.ys;
      this.ys = tf.keep(oldY.concat(y, 0));

      oldX.forEach((tensor) => tensor.dispose());
      oldY.dispose();
      y.dispose();
    }
  }
}
