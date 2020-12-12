import { InputResolution } from "../types";
import { PoseNetOutputStride } from "./types";

const MOBILENET_BASE_URL =
  "https://storage.googleapis.com/aresobus-models/savedmodel/posenet/mobilenet/";
const RESNET50_BASE_URL =
  "https://storage.googleapis.com/aresobus-models/savedmodel/posenet/resnet50/";

// The PoseNet 2.0 ResNet50 models use the latest  1.0 model
// format.
export function resNet50Checkpoint(stride: number, quantBytes: number): string {
  const graphJson = `model-stride${stride}.json`;
  // quantBytes=4 corresponding to the non-quantized full-precision checkpoints.
  if (quantBytes === 4) {
    return RESNET50_BASE_URL + `float/` + graphJson;
  } else {
    return RESNET50_BASE_URL + `quant${quantBytes}/` + graphJson;
  }
}

// The PoseNet 2.0 MobileNetV1 models use the latest  1.0 model
// format.
export function mobileNetCheckpoint(
  stride: number,
  multiplier: number,
  quantBytes: number
): string {
  const toStr: { [key: number]: string } = {
    1.0: "100",
    0.75: "075",
    0.5: "050",
  };
  const graphJson = `model-stride${stride}.json`;
  // quantBytes=4 corresponding to the non-quantized full-precision checkpoints.
  if (quantBytes === 4) {
    return MOBILENET_BASE_URL + `float/${toStr[multiplier]}/` + graphJson;
  } else {
    return (
      MOBILENET_BASE_URL +
      `quant${quantBytes}/${toStr[multiplier]}/` +
      graphJson
    );
  }
}

export function getValidInputResolutionDimensions(
  inputResolution: InputResolution,
  outputStride: PoseNetOutputStride
): InputResolution {
  return {
    height: toValidInputResolution(inputResolution.height, outputStride),
    width: toValidInputResolution(inputResolution.width, outputStride),
  };
}

export function toValidInputResolution(
  inputResolution: number,
  outputStride: PoseNetOutputStride
): number {
  if (isValidInputResolution(inputResolution, outputStride)) {
    return inputResolution;
  }

  return Math.floor(inputResolution / outputStride) * outputStride + 1;
}

function isValidInputResolution(
  resolution: number,
  outputStride: number
): boolean {
  return (resolution - 1) % outputStride === 0;
}
