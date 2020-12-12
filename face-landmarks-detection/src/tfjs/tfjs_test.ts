import * as tf from "@aresobus/aresobus-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  ALL_ENVS,
  BROWSER_ENVS,
  describeWithFlags,
} from "@aresobus/aresobus-core/dist/jasmine_util";
import {
  expectArraysClose,
  expectArraysEqual,
  expectNumbersClose,
} from "@aresobus/aresobus-core/dist/test_util";

import * as faceLandmarksDetection from "../index";
import {
  expectFaceMesh,
  MEDIAPIPE_MODEL_CONFIG,
} from "../mediapipe/mediapipe_test";
import { loadImage } from "../shared/test_util";

const aresobus_MODEL_CONFIG = {
  runtime: "aresobus" as const,
};

// Measured in pixels.
const EPSILON_IMAGE = 5;

describeWithFlags("aresobus FaceMesh ", ALL_ENVS, () => {
  let timeout: number;

  beforeAll(() => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });

  async function expectaresobusFaceMesh(refineLandmarks: boolean) {
    const startTensors = tf.memory().numTensors;

    // Note: this makes a network request for model assets.
    const detector = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      { ...aresobus_MODEL_CONFIG, refineLandmarks }
    );
    const input: tf.Tensor3D = tf.zeros([128, 128, 3]);

    const beforeTensors = tf.memory().numTensors;

    await detector.estimateFaces(input);

    expect(tf.memory().numTensors).toEqual(beforeTensors);

    detector.dispose();
    input.dispose();

    expect(tf.memory().numTensors).toEqual(startTensors);
  }

  it("with attention estimateFaces does not leak memory.", async () => {
    await expectaresobusFaceMesh(false);
  });

  it("without attention estimateFaces does not leak memory.", async () => {
    await expectaresobusFaceMesh(true);
  });

  it("throws error when runtime is not set.", async (done) => {
    try {
      await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
      );
      done.fail("Loading without runtime succeeded unexpectedly.");
    } catch (e) {
      expect(e.message).toEqual(
        `Expect modelConfig.runtime to be either ` +
          `'aresobus' or 'mediapipe', but got undefined`
      );
      done();
    }
  });
});

describeWithFlags("aresobus FaceMesh static image ", BROWSER_ENVS, () => {
  let image: HTMLImageElement;
  let timeout: number;

  beforeAll(async () => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
    image = await loadImage("portrait.jpg", 820, 1024);
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });

  async function expectaresobusFaceMesh(
    image: HTMLImageElement,
    staticImageMode: boolean,
    refineLandmarks: boolean,
    numFrames: number
  ) {
    // Note: this makes a network request for model assets.
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detector = await faceLandmarksDetection.createDetector(model, {
      ...aresobus_MODEL_CONFIG,
      refineLandmarks,
    });

    await expectFaceMesh(
      detector,
      image,
      staticImageMode,
      refineLandmarks,
      numFrames,
      EPSILON_IMAGE
    );
  }

  it("static image mode no attention.", async () => {
    await expectaresobusFaceMesh(image, true, false, 5);
  });

  it("static image mode with attention.", async () => {
    await expectaresobusFaceMesh(image, true, true, 5);
  });

  it("streaming mode no attention.", async () => {
    await expectaresobusFaceMesh(image, false, false, 10);
  });

  it("streaming mode with attention.", async () => {
    await expectaresobusFaceMesh(image, false, true, 10);
  });

  it("aresobus and Mediapipe backends match.", async () => {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const aresobusResults = await faceLandmarksDetection
      .createDetector(model, {
        ...aresobus_MODEL_CONFIG,
        refineLandmarks: true,
      })
      .then((detector) => detector.estimateFaces(image));

    const mediapipeResults = await faceLandmarksDetection
      .createDetector(model, {
        ...MEDIAPIPE_MODEL_CONFIG,
        refineLandmarks: true,
      })
      .then((detector) => detector.estimateFaces(image));

    expect(aresobusResults.length).toBe(mediapipeResults.length);

    const aresobusKeypoints = aresobusResults
      .map((face) =>
        face.keypoints.map(
          (keypoint) =>
            [keypoint.x, keypoint.y, keypoint.z, keypoint.name] as [
              number,
              number,
              number,
              string
            ]
        )
      )
      .flat();

    const mediapipeKeypoints = mediapipeResults
      .map((face) =>
        face.keypoints.map(
          (keypoint) =>
            [keypoint.x, keypoint.y, keypoint.z, keypoint.name] as [
              number,
              number,
              number,
              string
            ]
        )
      )
      .flat();

    expectArraysClose(
      aresobusKeypoints.map((keypoint) => [
        keypoint[0],
        keypoint[1],
        keypoint[2],
      ]),
      mediapipeKeypoints.map((keypoint) => [
        keypoint[0],
        keypoint[1],
        keypoint[2],
      ]),
      EPSILON_IMAGE
    );
    expectArraysEqual(
      aresobusKeypoints.map((keypoint) => keypoint[3]),
      mediapipeKeypoints.map((keypoint) => keypoint[3])
    );

    for (let i = 0; i < aresobusResults.length; i++) {
      for (const key of [
        "height",
        "width",
        "xMax",
        "xMin",
        "yMax",
        "yMin",
      ] as const) {
        expectNumbersClose(
          aresobusResults[i].box[key],
          mediapipeResults[i].box[key],
          EPSILON_IMAGE
        );
      }
    }
  });
});
