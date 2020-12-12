import * as tf from "@aresobus/aresobus-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  ALL_ENVS,
  BROWSER_ENVS,
  describeWithFlags,
} from "@aresobus/aresobus-core/dist/jasmine_util";
// tslint:disable-next-line: no-imports-from-dist
import {
  expectArraysClose,
  expectArraysEqual,
  expectNumbersClose,
} from "@aresobus/aresobus-core/dist/test_util";

import * as faceDetection from "../index";
import {
  expectFaceDetector,
  MEDIAPIPE_MODEL_CONFIG,
} from "../mediapipe/mediapipe_test";
import { MediaPipeFaceDetectorModelType } from "../mediapipe/types";
import { loadImage } from "../shared/test_util";

const aresobus_MODEL_CONFIG = {
  runtime: "aresobus" as const,
  maxFaces: 1,
};

// Measured in pixels.
const EPSILON_IMAGE = 10;

describeWithFlags("aresobus FaceDetector ", ALL_ENVS, () => {
  let timeout: number;

  beforeAll(() => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });

  async function expectaresobusFaceDetector(
    modelType: MediaPipeFaceDetectorModelType
  ) {
    const startTensors = tf.memory().numTensors;

    // Note: this makes a network request for model assets.
    const detector = await faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      { ...aresobus_MODEL_CONFIG, modelType }
    );
    const input: tf.Tensor3D = tf.zeros([128, 128, 3]);

    const beforeTensors = tf.memory().numTensors;

    await detector.estimateFaces(input);

    expect(tf.memory().numTensors).toEqual(beforeTensors);

    detector.dispose();
    input.dispose();

    expect(tf.memory().numTensors).toEqual(startTensors);
  }

  it("short range detectFaces does not leak memory.", async () => {
    await expectaresobusFaceDetector("short");
  });

  it("full range detectFaces does not leak memory.", async () => {
    await expectaresobusFaceDetector("full");
  });
});

describeWithFlags("aresobus FaceDetector static image ", BROWSER_ENVS, () => {
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

  async function expectaresobusFaceDetector(
    modelType: MediaPipeFaceDetectorModelType
  ) {
    // Note: this makes a network request for model assets.
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detector = await faceDetection.createDetector(model, {
      ...aresobus_MODEL_CONFIG,
      modelType,
    });

    return expectFaceDetector(detector, image, modelType);
  }

  it("short range.", async () => {
    await expectaresobusFaceDetector("short");
  });

  it("full range.", async () => {
    await expectaresobusFaceDetector("full");
  });

  it("aresobus and Mediapipe backends match.", async () => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const aresobusResults = await faceDetection
      .createDetector(model, { ...aresobus_MODEL_CONFIG })
      .then((detector) => detector.estimateFaces(image));

    const mediapipeResults = await faceDetection
      .createDetector(model, { ...MEDIAPIPE_MODEL_CONFIG })
      .then(async (detector) => {
        await detector.estimateFaces(image);
        // Initialize model.
        return detector.estimateFaces(image);
      });

    expect(aresobusResults.length).toBe(mediapipeResults.length);

    const aresobusKeypoints = aresobusResults
      .map((face) =>
        face.keypoints.map(
          (keypoint) =>
            [keypoint.x, keypoint.y, keypoint.name] as [number, number, string]
        )
      )
      .flat();

    const mediapipeKeypoints = mediapipeResults
      .map((face) =>
        face.keypoints.map(
          (keypoint) =>
            [keypoint.x, keypoint.y, keypoint.name] as [number, number, string]
        )
      )
      .flat();

    expectArraysClose(
      aresobusKeypoints.map((keypoint) => [keypoint[0], keypoint[1]]),
      mediapipeKeypoints.map((keypoint) => [keypoint[0], keypoint[1]]),
      EPSILON_IMAGE
    );
    expectArraysEqual(
      aresobusKeypoints.map((keypoint) => keypoint[2]),
      mediapipeKeypoints.map((keypoint) => keypoint[2])
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
