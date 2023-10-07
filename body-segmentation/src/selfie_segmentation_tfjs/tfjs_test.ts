import * as tf from "@aresobus/lightweight-models-core";
// tslint:disable-next-line: no-imports-from-dist
import {
  ALL_ENVS,
  BROWSER_ENVS,
  describeWithFlags,
} from "@aresobus/lightweight-models-core/dist/jasmine_util";

import * as bodySegmentation from "../index";
import { toImageDataLossy } from "../shared/calculators/mask_util";
import {
  imageToBooleanMask,
  loadImage,
  segmentationIOU,
} from "../shared/test_util";

// Measured in percent.
const EPSILON_IOU = 0.98;

describeWithFlags("aresobus MediaPipeSelfieSegmentation ", ALL_ENVS, () => {
  let timeout: number;

  beforeAll(() => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });

  async function expectSegmenter(
    modelType: bodySegmentation.MediaPipeSelfieSegmentationModelType
  ) {
    const startTensors = tf.memory().numTensors;

    // Note: this makes a network request for model assets.
    const detector = await bodySegmentation.createSegmenter(
      bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation,
      { runtime: "aresobus", modelType }
    );
    const input: tf.Tensor3D = tf.zeros([128, 128, 3]);

    const beforeTensors = tf.memory().numTensors;

    const segmentation = await detector.segmentPeople(input);
    (await segmentation[0].mask.toTensor()).dispose();

    expect(tf.memory().numTensors).toEqual(beforeTensors);

    detector.dispose();
    input.dispose();

    expect(tf.memory().numTensors).toEqual(startTensors);
  }

  it("general segmentPeople does not leak memory.", async () => {
    await expectSegmenter("general");
  });

  it("landscape segmentPeople does not leak memory.", async () => {
    await expectSegmenter("landscape");
  });
});

describeWithFlags(
  "aresobus MediaPipeSelfieSegmentation static image ",
  BROWSER_ENVS,
  () => {
    let segmenter: bodySegmentation.BodySegmenter;
    let image: HTMLImageElement;
    let segmentationImage: HTMLImageElement;
    let timeout: number;

    beforeAll(async () => {
      timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
      image = await loadImage("portrait.jpg", 820, 1024);
      segmentationImage = await loadImage(
        "portrait_segmentation.png",
        820,
        1024
      );
    });

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });

    async function expectSegmenter(
      segmenter: bodySegmentation.BodySegmenter,
      image: HTMLImageElement,
      segmentationImage: HTMLImageElement
    ) {
      const result = await segmenter.segmentPeople(image, {});

      const segmentation = result[0];
      const maskValuesToLabel = Array.from(Array(256).keys(), (v, _) =>
        segmentation.maskValueToLabel(v)
      );
      const mask = segmentation.mask;
      const actualBooleanMask = imageToBooleanMask(
        // Round to binary mask using red value cutoff of 128.
        (await segmentation.mask.toImageData()).data,
        128,
        0,
        0
      );
      const expectedBooleanMask = imageToBooleanMask(
        (await toImageDataLossy(segmentationImage)).data,
        0,
        0,
        255
      );

      expect(maskValuesToLabel.every((label) => label === "person"));
      expect(mask.getUnderlyingType() === "tensor");
      expect(
        segmentationIOU(expectedBooleanMask, actualBooleanMask)
      ).toBeGreaterThanOrEqual(EPSILON_IOU);
    }

    it("general model test.", async () => {
      // Note: this makes a network request for model assets.
      const model =
        bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
      segmenter = await bodySegmentation.createSegmenter(model, {
        runtime: "aresobus",
        modelType: "general",
      });

      expectSegmenter(segmenter, image, segmentationImage);

      segmenter.dispose();
    });

    it("landscape model test.", async () => {
      // Note: this makes a network request for model assets.
      const model =
        bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
      segmenter = await bodySegmentation.createSegmenter(model, {
        runtime: "aresobus",
        modelType: "landscape",
      });

      expectSegmenter(segmenter, image, segmentationImage);

      segmenter.dispose();
    });
  }
);
