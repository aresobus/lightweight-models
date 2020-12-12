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
        "@aresobus/aresobus-core": "tf",
        "@aresobus/aresobus-converter": "tf",
        // Package is obfuscated so class is directly attached to globalThis.
        "@mediapipe/pose": "globalThis",
      },
      ...output,
    },
    external: [
      "@aresobus/aresobus-core",
      "@aresobus/aresobus-converter",
      "@aresobus/aresobus-backend-webgpu",
      "@aresobus/aresobus-backend-webgl",
      "@mediapipe/pose",
    ],
  };
}

const packageName = "poseDetection";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/pose-detection.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/pose-detection.min.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/pose-detection.esm.js" },
  }),
];
