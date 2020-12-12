import { stubbedTokenizerVocab } from "./test_util";
import { Tokenizer } from "./tokenizer";

describe("Universal Sentence Encoder tokenizer", () => {
  let tokenizer: Tokenizer;
  beforeAll(() => {
    tokenizer = new Tokenizer(stubbedTokenizerVocab as Array<[string, number]>);
  });

  it("Trie creates a child for each unique prefix", () => {
    const childKeys = Object.keys(tokenizer.trie.root.children);
    expect(childKeys).toEqual(["▁", "a", ".", "I", "l", "i", "k", "e", "t"]);
  });

  it("Trie commonPrefixSearch basic usage", () => {
    const commonPrefixes = tokenizer.trie
      .commonPrefixSearch(["l", "i", "k", "e"])
      .map((d) => d[0].join(""));

    expect(commonPrefixes).toEqual(["l", "like"]);
  });
});
