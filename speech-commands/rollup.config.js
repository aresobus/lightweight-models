import node from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
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
        "@aresobus/lightweight-models-core": "tf",
        "@aresobus/lightweight-models-layers": "tf",
        "@aresobus/lightweight-models-data": "tf.data",
      },
      ...output,
    },
    external: [
      "@aresobus/lightweight-models-core",
      "@aresobus/lightweight-models-layers",
      "@aresobus/lightweight-models-data",
    ],
  };
}

const packageName = "speechCommands";
export default [
  config({
    output: {
      format: "umd",
      name: packageName,
      file: "dist/speech-commands.js",
    },
  }),
  config({
    plugins: [minify()],
    output: {
      format: "umd",
      name: packageName,
      file: "dist/speech-commands.min.js",
    },
  }),
  config({
    plugins: [minify()],
    output: { format: "es", file: "dist/speech-commands.esm.js" },
  }),
];
