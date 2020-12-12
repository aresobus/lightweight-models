import * as tf from "@aresobus/aresobus-core";

/**
 * A dataset for webcam controls which allows the user to add example Tensors
 * for particular labels. This object will concat them into two large xs and ys.
 */
export class Dataset {
  xs: tf.Tensor;
  ys: tf.Tensor;
  constructor(public numClasses: number) {}

  /**
   * Adding data pair to the dataset, examples and labels should have the
   * matching shape. For example, if the input shape is [2, 20, 20], 2 is the
   * batch size, the labels shape should be [2,10] (num of classes is 10).
   *
   * @param examples Batch of inputs
   * @param labels Matching labels for inputs
   */
  addExamples(examples: tf.Tensor, labels: tf.Tensor) {
    if (this.xs == null) {
      // For the first example that gets added, keep example and y so that the
      // Dataset owns the memory of the inputs. This makes sure that
      // if addExample() is called in a tf.tidy(), these Tensors will not get
      // disposed.
      this.xs = tf.keep(examples);
      this.ys = tf.keep(labels);
    } else {
      const oldX = this.xs;
      this.xs = tf.keep(this.xs.concat(examples, 0));

      const oldY = this.ys;
      this.ys = tf.keep(oldY.concat(labels, 0));
      oldX.dispose();
      oldY.dispose();
    }
  }
}
