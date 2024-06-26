import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

function config({ plugins = [], output = {}, tsCompilerOptions = {} }) {
  const defaultTsOptions = {
    include: ["src/**/*.ts"],
    module: "ES2015",
  };
  const tsoptions = Object.assign({}, defaultTsOptions, tsCompilerOptions);

  return {
    input: "src/index.ts",
    plugins: [
      typescript(tsoptions),
      resolve(),
      commonjs({ include: ["node_modules/@mediapipe/face_detection/**"] }),
      ...plugins,
    ],
    output: {
      banner: PREAMBLE,
      globals: {
        "@aresobus/lightweight-models-core": "tf",
        "@aresobus/lightweight-models-converter": "tf",
        "@lightweight-models/face-detection": "faceDetection",
        // Package is obfuscated so class is directly attached to globalThis.
        "@mediapipe/face_mesh": "globalThis",
      },
      ...output,
    },
    external: [
      "@aresobus/lightweight-models-core",
      "@aresobus/lightweight-models-converter",
      "-models/face-detection",
      "@mediapipe/face_mesh",
    ],
  };
}

const packageName = "faceLandmarksDetection";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/face-landmarks-detection.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/face-landmarks-detection.min.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/face-landmarks-detection.esm.js" },
  }),
];
