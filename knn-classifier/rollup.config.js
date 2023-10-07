import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import uglify from "rollup-plugin-uglify";

function minify() {
  return uglify({ output: { preamble: PREAMBLE } });
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
      },
      ...output,
    },
    external: ["@aresobus/lightweight-models-core"],
  };
}

export default [
  config({
    output: {
      format: "umd",
      name: "knnClassifier",
      file: "dist/knn-classifier.js",
    },
  }),
  config({
    plugins: [minify()],
    output: {
      format: "umd",
      name: "knnClassifier",
      file: "dist/knn-classifier.min.js",
    },
  }),
  config({
    plugins: [minify()],
    output: {
      format: "es",
      file: "dist/knn-classifier.esm.js",
    },
  }),
];
