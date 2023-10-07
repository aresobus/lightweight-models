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
        "@mediapipe/hands": "globalThis",
      },
      ...output,
    },
    external: [
      "@aresobus/lightweight-models-core",
      "@aresobus/lightweight-models-converter",
      "@mediapipe/hands",
    ],
  };
}

const packageName = "handPoseDetection";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/hand-pose-detection.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/hand-pose-detection.min.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/hand-pose-detection.esm.js" },
  }),
];
