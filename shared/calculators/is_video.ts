import { PixelInput } from "./interfaces/common_interfaces";

export function isVideo(image: PixelInput): image is HTMLVideoElement {
  return image != null && (image as HTMLVideoElement).currentTime != null;
}
