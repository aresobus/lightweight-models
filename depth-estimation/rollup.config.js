/**

 * =============================================================================
 */

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
      commonjs({ include: ["node_modules/@mediapipe/selfie_segmentation/**"] }),
      ...plugins,
    ],
    output: {
      banner: PREAMBLE,
      globals: {
        "@aresobus/aresobus-core": "tf",
        "@aresobus/aresobus-converter": "tf",
        "@aresobus-models/body-segmentation": "bodySegmentation",
      },
      ...output,
    },
    external: [
      "@aresobus/aresobus-core",
      "@aresobus/aresobus-converter",
      "@aresobus-models/body-segmentation",
    ],
  };
}

const packageName = "depthEstimation";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/depth-estimation.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/depth-estimation.min.js",
    },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/depth-estimation.esm.js" },
  }),
];
