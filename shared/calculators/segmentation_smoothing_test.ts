import * as tf from "@aresobus/lightweight-models-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  BROWSER_ENVS,
  describeWithFlags,
} from "@aresobus/lightweight-models-core/dist/jasmine_util";
// tslint:disable-next-line: no-imports-from-dist
import { expectNumbersClose } from "@aresobus/lightweight-models-core/dist/test_util";

import { arrayToMatrix4x4 } from "./calculate_inverse_matrix";
import { smoothSegmentation } from "./segmentation_smoothing";

function runTest(useWebGL: boolean, mixRatio: number) {
  const prevMask = arrayToMatrix4x4(new Array(16).fill(111 / 255));
  const curMask = arrayToMatrix4x4([
    0.0,
    0.0,
    0.0,
    0.0, //
    0.0,
    0.98,
    0.98,
    0.0, //
    0.0,
    0.98,
    0.98,
    0.0, //
    0.0,
    0.0,
    0.0,
    0.0,
  ]);

  tf.setBackend(useWebGL ? "webgl" : "cpu");

  const resultMask = smoothSegmentation(
    tf.tensor2d(prevMask),
    tf.tensor2d(curMask),
    { combineWithPreviousRatio: mixRatio }
  );

  expect(resultMask.shape[0]).toBe(curMask.length);
  expect(resultMask.shape[1]).toBe(curMask[0].length);

  const result = resultMask.arraySync();

  if (mixRatio === 1.0) {
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        const input = curMask[i][j];
        const output = result[i][j];
        // Since the input has high value (250), it has low uncertainty.
        // So the output should have changed lower (towards prev),
        // but not too much.
        if (input > 0) {
          expect(input).not.toBeCloseTo(output);
        }
        expectNumbersClose(input, output, 3.0 / 255.0);
      }
    }
  } else if (mixRatio === 0.0) {
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        const input = curMask[i][j];
        const output = result[i][j];
        expectNumbersClose(input, output, 1e-7); // Output should match current.
      }
    }
  } else {
    throw new Error(`Invalid mixRatio: ${mixRatio}`);
  }

  return result;
}
describeWithFlags("smoothSegmentation ", BROWSER_ENVS, () => {
  it("test smoothing.", async () => {
    runTest(false, 0.0);
    const cpuResult = runTest(false, 1.0);
    const glResult = runTest(true, 1.0);

    // CPU & webGL should match.
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        expectNumbersClose(cpuResult[i][j], glResult[i][j], 1e-7);
      }
    }
  });
});
