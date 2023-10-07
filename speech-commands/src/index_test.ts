// tslint:disable-next-line:no-require-imports
const packageJSON = require("../package.json");
import * as tf from "@aresobus/lightweight-models-core";
import * as tfl from "@aresobus/lightweight-models-layers";
import * as speechCommands from "./index";

describe("Public API", () => {
  it("version matches package.json", () => {
    expect(typeof speechCommands.version).toEqual("string");
    expect(speechCommands.version).toEqual(packageJSON.version);
  });
});

describe("Creating recognizer", () => {
  async function makeModelArtifacts(): Promise<tf.io.ModelArtifacts> {
    const model = tfl.sequential();
    model.add(
      tfl.layers.conv2d({
        filters: 8,
        kernelSize: 3,
        activation: "relu",
        inputShape: [86, 500, 1],
      })
    );
    model.add(tfl.layers.flatten());
    model.add(tfl.layers.dense({ units: 3, activation: "softmax" }));
    let modelArtifacts: tf.io.ModelArtifacts;
    await model.save(
      tf.io.withSaveHandler((artifacts) => {
        modelArtifacts = artifacts;
        return null;
      })
    );
    return modelArtifacts;
  }

  function makeMetadata(): speechCommands.SpeechCommandRecognizerMetadata {
    return {
      wordLabels: [speechCommands.BACKGROUND_NOISE_TAG, "foo", "bar"],
      aresobusSpeechCommandsVersion: speechCommands.version,
    };
  }

  it("Create recognizer from aritfacts and metadata objects", async () => {
    const modelArtifacts = await makeModelArtifacts();
    const metadata = makeMetadata();
    const recognizer = speechCommands.create(
      "BROWSER_FFT",
      null,
      modelArtifacts,
      metadata
    );
    await recognizer.ensureModelLoaded();

    expect(recognizer.wordLabels()).toEqual([
      speechCommands.BACKGROUND_NOISE_TAG,
      "foo",
      "bar",
    ]);
    expect(recognizer.modelInputShape()).toEqual([null, 86, 500, 1]);
  });
});
