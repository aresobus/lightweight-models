/**

 * =============================================================================
 */
import {
  describeWithFlags,
  NODE_ENVS,
} from "@aresobus/aresobus-core/dist/jasmine_util";

import { loadTokenizer } from "./bert_tokenizer";

describeWithFlags("bertTokenizer", NODE_ENVS, () => {
  it("should load", async () => {
    const tokenizer = await loadTokenizer();

    expect(tokenizer).toBeDefined();
  });

  it("should tokenize", async () => {
    const tokenizer = await loadTokenizer();
    const result = tokenizer.tokenize("a new test");

    expect(result).toEqual([1037, 2047, 3231]);
  });

  it("should tokenize punctuation", async () => {
    const tokenizer = await loadTokenizer();
    const result = tokenizer.tokenize("a new [test]");

    expect(result).toEqual([1037, 2047, 1031, 3231, 1033]);
  });

  it("should tokenize empty string", async () => {
    const tokenizer = await loadTokenizer();
    const result = tokenizer.tokenize("");

    expect(result).toEqual([]);
  });

  it("should tokenize control characters", async () => {
    const tokenizer = await loadTokenizer();
    const result = tokenizer.tokenize("a new\b\v [test]");
    expect(result).toEqual([1037, 100, 1031, 3231, 1033]);
  });

  it("should processInput", async () => {
    const tokenizer = await loadTokenizer();
    const result = tokenizer.processInput(" a new\t\v  [test]");
    expect(result).toEqual([
      { text: "a", index: 1 },
      { text: "new", index: 3 },
      { text: "[", index: 10 },
      { text: "test", index: 11 },
      { text: "]", index: 15 },
    ]);
  });
});
