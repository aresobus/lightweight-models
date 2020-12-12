import { Detection } from "./interfaces/shape_interfaces";
import { nonMaxSuppression } from "./non_max_suppression";

function createDetection(
  label: string,
  score: number,
  xMin: number,
  yMin: number,
  size: number
): Detection {
  return {
    locationData: {
      relativeBoundingBox: {
        xMin,
        yMin,
        width: size,
        height: size,
        xMax: xMin + size,
        yMax: yMin + size,
      },
    },
    label: [label],
    score: [score],
  };
}

describe("NonMaxSuppression", () => {
  it("IntersectionOverUnion.", async () => {
    const inputDetections = [
      createDetection("obj1", 1, 0, 0, 10),
      createDetection("obj2", 1.2, 2, 2, 10),
      createDetection("obj3", 1, 15, 15, 10),
      createDetection("obj4", 2, 40, 40, 10),
    ];
    const outputDetections = await nonMaxSuppression(
      inputDetections.slice(),
      2,
      0.2,
      "intersection-over-union"
    );

    expect(outputDetections.length).toBe(2);
    expect(outputDetections[0]).toBe(inputDetections[3]);
    expect(outputDetections[1]).toBe(inputDetections[1]);
  });
});
