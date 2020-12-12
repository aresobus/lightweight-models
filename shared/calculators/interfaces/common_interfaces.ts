import { Tensor3D } from "@aresobus/aresobus-core";

export type PixelInput =
  | Tensor3D
  | ImageData
  | HTMLVideoElement
  | HTMLImageElement
  | HTMLCanvasElement
  | ImageBitmap;

export interface InputResolution {
  width: number;
  height: number;
}

/**
 * A keypoint that contains coordinate information.
 */
export interface Keypoint {
  x: number;
  y: number;
  z?: number;
  score?: number; // The probability of a keypoint's visibility.
  name?: string;
}

export interface ImageSize {
  height: number;
  width: number;
}

export interface Padding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type ValueTransform = {
  scale: number;
  offset: number;
};

export interface WindowElement {
  distance: number;
  duration: number;
}

export interface KeypointsFilter {
  apply(
    landmarks: Keypoint[],
    microSeconds: number,
    objectScale: number
  ): Keypoint[];
  reset(): void;
}

export interface Mask {
  toCanvasImageSource(): Promise<CanvasImageSource> /* RGBA image of same size as input, where
                            mask semantics are green and blue are always set to
                            0. Different red values denote different body
                            parts(see maskValueToBodyPart explanation below).
                            Different alpha values denote the probability of
                            pixel being a foreground pixel (0 being lowest
                            probability and 255 being highest).*/;

  toImageData(): Promise<ImageData> /* 1 dimensional array of size image width * height *
                    4, where each pixel is represented by RGBA in that order.
                    For each pixel, the semantics are green and blue are always
                    set to 0, and different red values denote different body
                    parts (see maskValueToBodyPart explanation below). Different
                    alpha values denote the probability of the pixel being a
                    foreground pixel (0 being lowest probability and 255 being
                    highest). */;

  toTensor(): Promise<Tensor3D> /* RGBA image of same size as input, where mask
                   semantics are green and blue are always set to 0. Different
                   red values denote different body parts (see
                   maskValueToBodyPart explanation below). Different alpha
                   values denote the probability of pixel being a foreground
                   pixel (0 being lowest probability and 255 being highest).*/;

  getUnderlyingType():
    | "canvasimagesource"
    | "imagedata"
    | "tensor" /* determines which type the mask currently stores in its
                   implementation so that conversion can be avoided */;
}

export interface Segmentation {
  maskValueToLabel: (
    maskValue: number
  ) => string /* Maps a foreground pixel’s red value to the segmented part name
                 of that pixel. Should throw error for unsupported input
                 values.*/;
  mask: Mask;
}

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};
