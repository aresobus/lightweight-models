/**

 * =============================================================================
 */

import { GPT2 } from "./gpt2";

describe("gpt2", () => {
  let gpt2: GPT2;
  beforeEach(() => {
    gpt2 = new GPT2();
  });

  it("this is a fake test", async () => {
    expect(await gpt2.generate("asdf")).toEqual(" the park");
  });
});
