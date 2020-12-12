/**

 * =============================================================================
 */

import * as tfwebgpu from "@aresobus/aresobus-backend-webgpu";
import * as tf from "@aresobus/aresobus-core";
import { getMainHeaderString } from "./webgpu_util";

class GetpointsConfidenceProgram implements tfwebgpu.WebGPUProgram {
  outputShape: number[];
  shaderKey: string;
  dispatchLayout: { x: number[] };
  dispatch: [number, number, number];
  // A is heatmapScores, B is heatmapValues.
  variableNames = ["A", "B"];
  workgroupSize: [number, number, number];
  size = true;

  constructor(bShape: number[]) {
    const workgroupSizeX = 32;
    this.workgroupSize = [workgroupSizeX, 1, 1];
    this.outputShape = [bShape[0], 1];
    this.dispatchLayout = tfwebgpu.webgpu_util.flatDispatchLayout(
      this.outputShape
    );
    this.dispatch = tfwebgpu.webgpu_util.computeDispatch(
      this.dispatchLayout,
      this.outputShape,
      this.workgroupSize
    );
    this.shaderKey = "getpointsConfidenceOp";
  }

  getUserCode(): string {
    return `
        ${getMainHeaderString("index")} {
          if (index < uniforms.size) {
            let y = B[index * 2];
            let x = B[index * 2 + 1];
            let outIndex = y * uniforms.aShape.x * uniforms.aShape.z + x * uniforms.aShape.z + index;
            result[index] = A[outIndex];
          }
        }
        `;
  }
}

export function getPointsConfidenceWebGPU<T extends tf.Tensor>(a: T, b: T): T {
  const webgpuBackend = tf.backend() as tfwebgpu.WebGPUBackend;
  const program = new GetpointsConfidenceProgram(b.shape);

  const outInfo: tf.TensorInfo = webgpuBackend.runWebGPUProgram(
    program,
    [a, b],
    "float32"
  );
  const value = tf.engine().makeTensorFromTensorInfo(outInfo) as T;

  return value;
}
