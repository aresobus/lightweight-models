import * as bodySegmentation from "@aresobus-models/body-segmentation";
import * as poseDetection from "@aresobus-models/pose-detection";

export const DEFAULT_LINE_WIDTH = 2;
export const DEFAULT_RADIUS = 4;

export const VIDEO_SIZE = {
  "640 X 480": { width: 640, height: 480 },
  "640 X 360": { width: 640, height: 360 },
  "360 X 270": { width: 360, height: 270 },
};
export const STATE = {
  camera: { targetFPS: 60, sizeOption: "640 X 480", cameraSelector: "" },
  fpsDisplay: { mode: "model" },
  backend: "",
  flags: {},
  modelConfig: {},
  visualization: {
    foregroundThreshold: 0.5,
    maskOpacity: 0.7,
    maskBlur: 0,
    pixelCellWidth: 10,
    backgroundBlur: 3,
    edgeBlur: 3,
  },
};
export const SELFIE_SEGMENTATION_CONFIG = {
  type: "general",
  visualization: "binaryMask",
};
export const BODY_PIX_CONFIG = {
  architecture: "MobileNetV1",
  outputStride: 16,
  multiplier: 0.75,
  quantBytes: 4,
  visualization: "binaryMask",
};
export const BLAZE_POSE_CONFIG = {
  maxPoses: 1,
  type: "full",
  visualization: "binaryMask",
};
/**
 * This map descripes tunable flags and theior corresponding types.
 *
 * The flags (keys) in the map satisfy the following two conditions:
 * - Is tunable. For example, `IS_BROWSER` and `IS_CHROME` is not tunable,
 * because they are fixed when running the scripts.
 * - Does not depend on other flags when registering in `ENV.registerFlag()`.
 * This rule aims to make the list streamlined, and, since there are
 * dependencies between flags, only modifying an independent flag without
 * modifying its dependents may cause inconsistency.
 * (`WEBGL_RENDER_FLOAT32_CAPABLE` is an exception, because only exposing
 * `WEBGL_FORCE_F16_TEXTURES` may confuse users.)
 */
export const TUNABLE_FLAG_VALUE_RANGE_MAP = {
  WEBGL_VERSION: [1, 2],
  WASM_HAS_SIMD_SUPPORT: [true, false],
  WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
  WEBGL_CPU_FORWARD: [true, false],
  WEBGL_PACK: [true, false],
  WEBGL_FORCE_F16_TEXTURES: [true, false],
  WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
  WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  CHECK_COMPUTATION_FOR_ERRORS: [true, false],
};

export const BACKEND_FLAGS_MAP = {
  ["aresobus-wasm"]: ["WASM_HAS_SIMD_SUPPORT", "WASM_HAS_MULTITHREAD_SUPPORT"],
  ["aresobus-webgl"]: [
    "WEBGL_VERSION",
    "WEBGL_CPU_FORWARD",
    "WEBGL_PACK",
    "WEBGL_FORCE_F16_TEXTURES",
    "WEBGL_RENDER_FLOAT32_CAPABLE",
    "WEBGL_FLUSH_THRESHOLD",
  ],
  ["mediapipe-gpu"]: [],
};

export const MODEL_BACKEND_MAP = {
  [bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation]: [
    "mediapipe-gpu",
    "aresobus-webgl",
  ],
  [bodySegmentation.SupportedModels.BodyPix]: ["aresobus-webgl"],
  [poseDetection.SupportedModels.BlazePose]: [
    "mediapipe-gpu",
    "aresobus-webgl",
  ],
};

export const TUNABLE_FLAG_NAME_MAP = {
  PROD: "production mode",
  WEBGL_VERSION: "webgl version",
  WASM_HAS_SIMD_SUPPORT: "wasm SIMD",
  WASM_HAS_MULTITHREAD_SUPPORT: "wasm multithread",
  WEBGL_CPU_FORWARD: "cpu forward",
  WEBGL_PACK: "webgl pack",
  WEBGL_FORCE_F16_TEXTURES: "enforce float16",
  WEBGL_RENDER_FLOAT32_CAPABLE: "enable float32",
  WEBGL_FLUSH_THRESHOLD: "GL flush wait time(ms)",
};
