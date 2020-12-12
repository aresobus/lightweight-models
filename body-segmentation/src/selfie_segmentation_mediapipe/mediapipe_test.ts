// tslint:disable-next-line: no-imports-from-dist
import {
  BROWSER_ENVS,
  describeWithFlags,
} from "@aresobus/aresobus-core/dist/jasmine_util";

import * as bodySegmentation from "../index";
import { toImageDataLossy } from "../shared/calculators/mask_util";
import {
  imageToBooleanMask,
  loadImage,
  segmentationIOU,
} from "../shared/test_util";

import { MediaPipeSelfieSegmentationMediaPipeModelConfig } from "./types";

const MEDIAPIPE_MODEL_CONFIG: MediaPipeSelfieSegmentationMediaPipeModelConfig =
  {
    runtime: "mediapipe",
    solutionPath: "base/node_modules/@mediapipe/selfie_segmentation",
  };

// Measured in percent.
const EPSILON_IOU = 0.93;

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
    (await segmentation.mask.toImageData()).data,
    255,
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
  expect(mask.getUnderlyingType() === "canvasimagesource");
  expect(
    segmentationIOU(expectedBooleanMask, actualBooleanMask)
  ).toBeGreaterThanOrEqual(EPSILON_IOU);
}

describeWithFlags(
  "MediaPipe SelfieSegmentation static image ",
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

    it("general model test.", async () => {
      // Note: this makes a network request for model assets.
      const model =
        bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
      segmenter = await bodySegmentation.createSegmenter(model, {
        ...MEDIAPIPE_MODEL_CONFIG,
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
        ...MEDIAPIPE_MODEL_CONFIG,
        modelType: "landscape",
      });

      expectSegmenter(segmenter, image, segmentationImage);

      segmenter.dispose();
    });
  }
);
