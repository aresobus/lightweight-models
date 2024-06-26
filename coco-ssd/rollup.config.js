import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

function config({
  plugins = [],
  output = {},
  external = [],
  visualize = false,
  tsCompilerOptions = {},
}) {
  if (visualize) {
    const filename = output.file + ".html";
    plugins.push(visualizer({ sourcemap: true, filename }));
    console.log(`Will output a bundle visualization in ${filename}`);
  }

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
      // Polyfill require() from dependencies.
      commonjs({
        ignore: ["crypto", "node-fetch", "util"],
        include: "node_modules/**",
        namedExports: {
          "./node_modules/seedrandom/index.js": ["alea"],
        },
      }),
      ...plugins,
    ],
    output: {
      banner: PREAMBLE,
      sourcemap: true,
      globals: {
        "@aresobus/lightweight-models-core": "tf",
        "@aresobus/lightweight-models-converter": "tf",
      },
      ...output,
    },
    external: [
      "@aresobus/lightweight-models-core",
      "@aresobus/lightweight-models-converter",
      ,
      ...external,
    ],
    onwarn: (warning) => {
      let { code } = warning;
      if (
        code === "CIRCULAR_DEPENDENCY" ||
        code === "CIRCULAR" ||
        code === "THIS_IS_UNDEFINED"
      ) {
        return;
      }
      console.warn("WARNING: ", warning.toString());
    },
  };
}

module.exports = (cmdOptions) => {
  const bundles = [];

  const terserPlugin = terser({
    output: { preamble: PREAMBLE, comments: false },
  });
  const name = "cocoSsd";
  const extend = true;
  const umdFormat = "umd";
  const flatEsmFormat = "es";
  const fileName = "coco-ssd";

  // Node
  bundles.push(
    config({
      output: {
        format: "cjs",
        name,
        extend,
        file: `dist/${fileName}.node.js`,
        freeze: false,
      },
      tsCompilerOptions: { target: "es5" },
    })
  );

  if (cmdOptions.ci || cmdOptions.npm) {
    // UMD default minified (ES5)
    bundles.push(
      config({
        plugins: [terserPlugin],
        output: {
          format: umdFormat,
          name,
          extend,
          file: `dist/${fileName}.min.js`,
          freeze: false,
        },
        tsCompilerOptions: { target: "es5" },
        visualize: cmdOptions.visualize,
      })
    );
  }

  if (cmdOptions.npm) {
    // UMD default unminified (ES5)
    bundles.push(
      config({
        output: {
          format: umdFormat,
          name,
          extend,
          file: `dist/${fileName}.js`,
          freeze: false,
        },
        tsCompilerOptions: { target: "es5" },
      })
    );

    // ESM ES2017 minified
    bundles.push(
      config({
        plugins: [terserPlugin],
        output: {
          format: umdFormat,
          name,
          extend,
          file: `dist/${fileName}.es2017.esm.min.js`,
        },
        tsCompilerOptions: { target: "es2017" },
      })
    );
  }

  return bundles;
};
