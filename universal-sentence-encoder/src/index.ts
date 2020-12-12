import * as tfconv from "@aresobus/aresobus-converter";
import * as tf from "@aresobus/aresobus-core";

import {
  loadTokenizer as loadTokenizerInternal,
  loadVocabulary,
  Tokenizer,
} from "./tokenizer";
import { loadQnA } from "./use_qna";

export { version } from "./version";

const BASE_PATH =
  "https://storage.googleapis.com/aresobus-models/savedmodel/universal_sentence_encoder";

declare interface ModelInputs extends tf.NamedTensorMap {
  indices: tf.Tensor;
  values: tf.Tensor;
}

interface LoadConfig {
  modelUrl?: string;
  vocabUrl?: string;
}

export async function load(config?: LoadConfig) {
  const use = new UniversalSentenceEncoder();
  await use.load(config);
  return use;
}

export class UniversalSentenceEncoder {
  private model: tfconv.GraphModel;
  private tokenizer: Tokenizer;

  async loadModel(modelUrl?: string) {
    return modelUrl
      ? tfconv.loadGraphModel(modelUrl)
      : tfconv.loadGraphModel(
          "https://tfhub.dev//aresobus-model/universal-sentence-encoder-lite/1/default/1",
          { fromTFHub: true }
        );
  }

  async load(config: LoadConfig = {}) {
    const [model, vocabulary] = await Promise.all([
      this.loadModel(config.modelUrl),
      loadVocabulary(config.vocabUrl || `${BASE_PATH}/vocab.json`),
    ]);

    this.model = model;
    this.tokenizer = new Tokenizer(vocabulary);
  }

  /**
   *
   * Returns a 2D Tensor of shape [input.length, 512] that contains the
   * Universal Sentence Encoder embeddings for each input.
   *
   * @param inputs A string or an array of strings to embed.
   */
  async embed(inputs: string[] | string): Promise<tf.Tensor2D> {
    if (typeof inputs === "string") {
      inputs = [inputs];
    }

    const encodings = inputs.map((d) => this.tokenizer.encode(d));

    const indicesArr = encodings.map((arr, i) =>
      arr.map((d, index) => [i, index])
    );

    let flattenedIndicesArr: Array<[number, number]> = [];
    for (let i = 0; i < indicesArr.length; i++) {
      flattenedIndicesArr = flattenedIndicesArr.concat(
        indicesArr[i] as Array<[number, number]>
      );
    }

    const indices = tf.tensor2d(
      flattenedIndicesArr,
      [flattenedIndicesArr.length, 2],
      "int32"
    );
    const values = tf.tensor1d(tf.util.flatten(encodings) as number[], "int32");

    const modelInputs: ModelInputs = { indices, values };

    const embeddings = await this.model.executeAsync(modelInputs);
    indices.dispose();
    values.dispose();

    return embeddings as tf.Tensor2D;
  }
}

/**
 * Load the Tokenizer for use independently from the UniversalSentenceEncoder.
 *
 * @param pathToVocabulary (optional) Provide a path to the vocabulary file.
 */
export async function loadTokenizer(pathToVocabulary?: string) {
  return loadTokenizerInternal(pathToVocabulary || BASE_PATH + "/vocab.json");
}

export { Tokenizer };
export { loadQnA };
