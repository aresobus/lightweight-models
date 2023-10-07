import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import uglify from "rollup-plugin-uglify";

function minify() {
  return uglify({
    output: {
      preamble: PREAMBLE,
    },
  });
}

function config({ plugins = [], output = {} }) {
  return {
    input: "src/index.ts",
    plugins: [
      typescript({ module: "ES2015", sourceMap: true }),
      nodeResolve(),
      ...plugins,
    ],
    output: {
      banner: PREAMBLE,
      globals: {
        "@aresobus/lightweight-models-core": "tf",
        "@aresobus/lightweight-models-converter": "tf",
      },
      ...output,
    },
    external: [
      "@aresobus/lightweight-models-core",
      "@aresobus/lightweight-models-converter",
    ],
  };
}

export default [
  config({
    output: {
      format: "umd",
      name: "qna",
      file: "dist/qna.js",
    },
  }),
  config({
    plugins: [minify()],
    output: {
      format: "umd",
      name: "qna",
      file: "dist/qna.min.js",
    },
  }),
  config({
    plugins: [minify()],
    output: {
      format: "es",
      file: "dist/qna.esm.js",
    },
  }),
];
