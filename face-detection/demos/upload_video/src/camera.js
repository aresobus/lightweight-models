/**

 * =============================================================================
 */

import { drawResults } from "./shared/util";

export class Context {
  constructor() {
    this.video = document.getElementById("video");
    this.canvas = document.getElementById("output");
    this.source = document.getElementById("currentVID");
    this.ctx = this.canvas.getContext("2d");
    const stream = this.canvas.captureStream();
    const options = { mimeType: "video/webm; codecs=vp9" };
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;
  }

  drawCtx() {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  drawResults(faces, boundingBox, keypoints) {
    drawResults(this.ctx, faces, boundingBox, keypoints);
  }
}
