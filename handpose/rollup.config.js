/**

 * =============================================================================
 */

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
      },
      ...output,
    },
    external: ["@aresobus/aresobus-core", "@aresobus/aresobus-converter"],
  };
}

export default [
  config({
    output: { format: "umd", name: "handpose", file: "dist/handpose.js" },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "umd", name: "handpose", file: "dist/handpose.min.js" },
  }),
  config({
    plugins: [terser({ output: { preamble: PREAMBLE, comments: false } })],
    output: { format: "es", file: "dist/handpose.esm.js" },
  }),
];
