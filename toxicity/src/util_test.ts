import { padInput } from "./util";

describe("Toxicity classifier util", () => {
  it("should pad inputs of different lengths", () => {
    const inputs = [
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5],
    ];

    expect(inputs.map((d) => padInput(d))).toEqual([
      [1, 2, 3, 0],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5, 0, 0, 0],
    ]);
  });
});
