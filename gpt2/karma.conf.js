/**

 * =============================================================================
 */

const karmaTypescriptConfig = {
  tsconfig: "tsconfig.test.json",
  // Disable coverage reports and instrumentation by default for tests.
  coverageOptions: { instrumentation: false },
  reports: {},
  bundlerOptions: {
    sourceMap: true,
    // Process any non ES5 code through karma-typescript-es6-transform (babel).
    acornOptions: { ecmaVersion: 8 },
    transforms: [
      require("karma-typescript-es6-transform")({
        presets: [
          // Ensure we get ES5 by adding IE 11 as a target.
          ["@babel/env", { targets: { ie: "11" }, loose: true }],
        ],
      }),
    ],
  },
};

const devConfig = {
  frameworks: ["jasmine", "karma-typescript"],
  files: [
    { pattern: "./node_modules/@babel/polyfill/dist/polyfill.js" },
    {
      // Serve test data as static resources.
      pattern: "test_data/**",
      watched: true,
      included: false,
      served: true,
      nocache: true,
    },
    "src/setup_test.ts",
    { pattern: "src/**/*.ts" },
  ],
  preprocessors: { "**/*.ts": ["karma-typescript"] },
  karmaTypescriptConfig,
  reporters: ["dots", "karma-typescript"],
};

const browserstackConfig = {
  ...devConfig,
  hostname: "bs-local.com",
  port: 9876,
};

module.exports = function (config) {
  const args = [];
  if (config.testEnv) {
    args.push("--testEnv", config.testEnv);
  }
  if (config.grep) {
    args.push("--grep", config.grep);
  }
  if (config.flags) {
    args.push("--flags", config.flags);
  }

  let extraConfig = null;

  if (config.browserstack) {
    extraConfig = browserstackConfig;
  } else {
    extraConfig = devConfig;
  }

  let exclude = [];
  if (config.excludeTest != null) {
    exclude.push(config.excludeTest);
  }

  config.set({
    ...extraConfig,
    singleRun: true,
    exclude,
    browsers: ["Chrome"],
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY,
      timeout: 1800,
      tunnelIdentifier: `depth_estimation_${Date.now()}_${Math.floor(
        Math.random() * 1000
      )}`,
    },
    captureTimeout: 3e5,
    reportSlowerThan: 500,
    browserNoActivityTimeout: 3e5,
    browserDisconnectTimeout: 3e5,
    browserDisconnectTolerance: 3,
    browserSocketTimeout: 1.2e5,
    customLaunchers: {
      // For browserstack configs see:
      // https://www.browserstack.com/automate/node
      bs_chrome_mac: {
        base: "BrowserStack",
        browser: "chrome",
        browser_version: "latest",
        os: "OS X",
        os_version: "High Sierra",
      },
      bs_firefox_mac: {
        base: "BrowserStack",
        browser: "firefox",
        browser_version: "latest",
        os: "OS X",
        os_version: "High Sierra",
      },
      bs_safari_mac: {
        base: "BrowserStack",
        browser: "safari",
        browser_version: "latest",
        os: "OS X",
        os_version: "High Sierra",
      },
      bs_ios_11: {
        base: "BrowserStack",
        device: "iPhone X",
        os: "iOS",
        os_version: "11.0",
        real_mobile: true,
      },
      bs_android_9: {
        base: "BrowserStack",
        device: "Google Pixel 3 XL",
        os: "android",
        os_version: "9.0",
        real_mobile: true,
      },
      win_10_chrome: {
        base: "BrowserStack",
        browser: "chrome",
        // Latest Chrome on Windows has WebGL problems:
        // https://github.com//aresobus/issues/2272
        browser_version: "77.0",
        os: "Windows",
        os_version: "10",
      },
    },
    client: { jasmine: { random: false }, args: args },
  });
};
