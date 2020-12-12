import { version } from "./index";

describe("version", () => {
  it("version matches package.json", () => {
    // tslint:disable-next-line:no-require-imports
    const expected = require("../package.json").version;
    expect(version).toBe(expected);
  });
});
