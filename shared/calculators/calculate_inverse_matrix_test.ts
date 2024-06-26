import * as tf from "@aresobus/lightweight-models-core";
// tslint:disable-next-line: no-imports-from-dist
import { expectArraysClose } from "@aresobus/lightweight-models-core/dist/test_util";

import {
  arrayToMatrix4x4,
  calculateInverseMatrix,
  Matrix4x4,
  matrix4x4ToArray,
} from "./calculate_inverse_matrix";

describe("calculateInverseMatrix", () => {
  const identity: Matrix4x4 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  it("identity matrix.", async () => {
    await tf.ready();
    const inverse = calculateInverseMatrix(identity);

    expectArraysClose(matrix4x4ToArray(inverse), matrix4x4ToArray(identity));
  });

  it("translation.", async () => {
    await tf.ready();
    const matrix: Matrix4x4 = [
      [1.0, 0.0, 0.0, 2.0],
      [0.0, 1.0, 0.0, -5.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    const inverse = calculateInverseMatrix(matrix);

    const expectedInverse: Matrix4x4 = [
      [1.0, 0.0, 0.0, -2.0],
      [0.0, 1.0, 0.0, 5.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    expectArraysClose(
      matrix4x4ToArray(inverse),
      matrix4x4ToArray(expectedInverse)
    );
  });

  it("scale.", async () => {
    await tf.ready();
    const matrix: Matrix4x4 = [
      [5.0, 0.0, 0.0, 0.0],
      [0.0, 2.0, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    const inverse = calculateInverseMatrix(matrix);

    const expectedInverse: Matrix4x4 = [
      [0.2, 0.0, 0.0, 0.0],
      [0.0, 0.5, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    expectArraysClose(
      matrix4x4ToArray(inverse),
      matrix4x4ToArray(expectedInverse)
    );
  });

  it("rotation90.", async () => {
    await tf.ready();
    const matrix: Matrix4x4 = [
      [0.0, -1.0, 0.0, 0.0],
      [1.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    const inverse = calculateInverseMatrix(matrix);

    const expectedInverse: Matrix4x4 = [
      [0.0, 1.0, 0.0, 0.0],
      [-1.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    expectArraysClose(
      matrix4x4ToArray(inverse),
      matrix4x4ToArray(expectedInverse)
    );
  });

  it("precision.", async () => {
    await tf.ready();
    const matrix: Matrix4x4 = [
      [0.00001, 0.0, 0.0, 0.0],
      [0.0, 0.00001, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    const inverse = calculateInverseMatrix(matrix);

    const expectedInverse: Matrix4x4 = [
      [100000.0, 0.0, 0.0, 0.0],
      [0.0, 100000.0, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];

    expectArraysClose(
      matrix4x4ToArray(inverse),
      matrix4x4ToArray(expectedInverse)
    );
  });

  it("random matrix.", async () => {
    for (let seed = 1; seed <= 5; ++seed) {
      await tf.ready();
      const matrix = tf.randomUniform([4, 4], 0, 10, "float32", seed);
      const inverse = calculateInverseMatrix(
        arrayToMatrix4x4(matrix.dataSync())
      );
      const product = tf.matMul(matrix, inverse);

      expectArraysClose(product.dataSync(), matrix4x4ToArray(identity));
    }
  });
});
