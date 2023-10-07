// tslint:disable-next-line: no-imports-from-dist
import { expectArraysEqual } from "@aresobus/lightweight-models-core/dist/test_util";

import {
  arrayBuffer2String,
  concatenateFloat32Arrays,
  string2ArrayBuffer,
} from "./generic_utils";

describe("string2ArrayBuffer and arrayBuffer2String", () => {
  it("round trip: ASCII only", () => {
    const str = "Lorem_Ipsum_123 !@#$%^&*()";
    expect(arrayBuffer2String(string2ArrayBuffer(str))).toEqual(str);
  });
  it("round trip: non-ASCII", () => {
    const str = "Welcome 欢迎 स्वागत हे ようこそ добро пожаловать 😀😀";
    expect(arrayBuffer2String(string2ArrayBuffer(str))).toEqual(str);
  });
  it("round trip: empty string", () => {
    const str = "";
    expect(arrayBuffer2String(string2ArrayBuffer(str))).toEqual(str);
  });
});

describe("concatenateFloat32Arrays", () => {
  it("Two non-empty", () => {
    const xs = new Float32Array([1, 3]);
    const ys = new Float32Array([3, 7]);
    expectArraysEqual(
      concatenateFloat32Arrays([xs, ys]),
      new Float32Array([1, 3, 3, 7])
    );
    expectArraysEqual(
      concatenateFloat32Arrays([ys, xs]),
      new Float32Array([3, 7, 1, 3])
    );
    // Assert that the original Float32Arrays are not altered.
    expectArraysEqual(xs, new Float32Array([1, 3]));
    expectArraysEqual(ys, new Float32Array([3, 7]));
  });

  it("Three unequal lengths non-empty", () => {
    const array1 = new Float32Array([1]);
    const array2 = new Float32Array([2, 3]);
    const array3 = new Float32Array([4, 5, 6]);
    expectArraysEqual(
      concatenateFloat32Arrays([array1, array2, array3]),
      new Float32Array([1, 2, 3, 4, 5, 6])
    );
  });

  it("One empty, one non-empty", () => {
    const xs = new Float32Array([4, 2]);
    const ys = new Float32Array(0);
    expectArraysEqual(
      concatenateFloat32Arrays([xs, ys]),
      new Float32Array([4, 2])
    );
    expectArraysEqual(
      concatenateFloat32Arrays([ys, xs]),
      new Float32Array([4, 2])
    );
    // Assert that the original Float32Arrays are not altered.
    expectArraysEqual(xs, new Float32Array([4, 2]));
    expectArraysEqual(ys, new Float32Array(0));
  });

  it("Two empty", () => {
    const xs = new Float32Array(0);
    const ys = new Float32Array(0);
    expectArraysEqual(concatenateFloat32Arrays([xs, ys]), new Float32Array(0));
    expectArraysEqual(concatenateFloat32Arrays([ys, xs]), new Float32Array(0));
    // Assert that the original Float32Arrays are not altered.
    expectArraysEqual(xs, new Float32Array(0));
    expectArraysEqual(ys, new Float32Array(0));
  });
});
