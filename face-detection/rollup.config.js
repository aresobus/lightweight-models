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
    plugins: [typescript(tsoptions), resolve(), ...plugins],
    output: {
      banner: PREAMBLE,
      globals: {
        "@aresobus/lightweight-models-core": "tf",
        "@aresobus/lightweight-models-converter": "tf",
        // Package is obfuscated so class is directly attached to globalThis.
        "@mediapipe/face_detection": "globalThis",
      },
      ...output,
    },
    external: [
      "@aresobus/lightweight-models-core",
      "@aresobus/lightweight-models-converter",
      "@mediapipe/face_detection",
    ],
  };
}

const packageName = "faceDetection";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/face-detection.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/face-detection.min.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/face-detection.esm.js" },
  }),
];
