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
        "@mediapipe/selfie_segmentation": "globalThis",
      },
      ...output,
    },
    external: [
      "@aresobus/aresobus-core",
      "@aresobus/aresobus-converter",
      "@mediapipe/selfie_segmentation",
    ],
  };
}

const packageName = "bodySegmentation";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/body-segmentation.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/body-segmentation.min.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/body-segmentation.esm.js" },
  }),
];
