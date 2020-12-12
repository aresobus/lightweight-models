import { stubbedTokenizerVocab } from "./test_util";
import { Tokenizer } from "./tokenizer";

describe("Universal Sentence Encoder tokenizer", () => {
  let tokenizer: Tokenizer;
  beforeAll(() => {
    tokenizer = new Tokenizer(stubbedTokenizerVocab as Array<[string, number]>);
  });

  it("basic usage", () => {
    expect(tokenizer.encode("Ilikeit.")).toEqual([11, 15, 16, 10]);
  });

  it("handles whitespace", () => {
    expect(tokenizer.encode("I like it.")).toEqual([11, 12, 13, 10]);
  });

  it("should normalize inputs", () => {
    expect(tokenizer.encode("ça")).toEqual(tokenizer.encode("c\u0327a"));
  });

  it("should handle unknown inputs", () => {
    expect(() => tokenizer.encode("😹")).not.toThrow();
  });

  it("should treat consecutive unknown inputs as a single word", () => {
    expect(tokenizer.encode("a😹😹")).toEqual([7, 0]);
  });
});
