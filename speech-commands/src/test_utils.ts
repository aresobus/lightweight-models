import { Tensor, test_util, util } from "@aresobus/aresobus-core";

export function expectTensorsClose(
  actual: Tensor | number[],
  expected: Tensor | number[],
  epsilon?: number
) {
  if (actual == null) {
    throw new Error("First argument to expectTensorsClose() is not defined.");
  }
  if (expected == null) {
    throw new Error("Second argument to expectTensorsClose() is not defined.");
  }
  if (actual instanceof Tensor && expected instanceof Tensor) {
    if (actual.dtype !== expected.dtype) {
      throw new Error(
        `Data types do not match. Actual: '${actual.dtype}'. ` +
          `Expected: '${expected.dtype}'`
      );
    }
    if (!util.arraysEqual(actual.shape, expected.shape)) {
      throw new Error(
        `Shapes do not match. Actual: [${actual.shape}]. ` +
          `Expected: [${expected.shape}].`
      );
    }
  }
  const actualData = actual instanceof Tensor ? actual.dataSync() : actual;
  const expectedData =
    expected instanceof Tensor ? expected.dataSync() : expected;
  test_util.expectArraysClose(actualData, expectedData, epsilon);
}
