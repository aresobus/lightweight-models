import { calculateLandmarkProjection } from "./calculate_landmark_projection";

describe("calculateLandmarkProjection", () => {
  it("default rectangle.", async () => {
    const landmarks = [{ x: 10, y: 20, z: -0.5 }];
    const rect = {
      xCenter: 0.5,
      yCenter: 0.5,
      height: 1.0,
      width: 1.0,
      rotation: 0,
    };

    const result = calculateLandmarkProjection(landmarks, rect);

    expect(result[0].x).toBe(10);
    expect(result[0].y).toBe(20);
    expect(result[0].z).toBe(-0.5);
  });

  it("cropped rectangle.", async () => {
    const landmarks = [{ x: 1, y: 1, z: -0.5 }];
    const rect = {
      xCenter: 0.5,
      yCenter: 0.5,
      height: 2,
      width: 0.5,
      rotation: 0,
    };

    const result = calculateLandmarkProjection(landmarks, rect);

    expect(result[0].x).toBe(0.75);
    expect(result[0].y).toBe(1.5);
    expect(result[0].z).toBe(-0.25);
  });
});
