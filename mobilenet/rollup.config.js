import node from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import uglify from "rollup-plugin-uglify";

function minify() {
  return uglify({ output: { preamble: PREAMBLE } });
}

function config({ plugins = [], output = {} }) {
  return {
    input: "src/index.ts",
    plugins: [
      typescript({
        tsconfigOverride: { compilerOptions: { module: "ES2015" } },
      }),
      node(),
      ...plugins,
    ],
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
    output: { format: "umd", name: "mobilenet", file: "dist/mobilenet.js" },
  }),
  config({
    plugins: [minify()],
    output: { format: "umd", name: "mobilenet", file: "dist/mobilenet.min.js" },
  }),
  config({
    plugins: [minify()],
    output: { format: "es", file: "dist/mobilenet.esm.js" },
  }),
];
