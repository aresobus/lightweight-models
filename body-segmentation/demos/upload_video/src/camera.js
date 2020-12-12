import * as params from "./shared/params";

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

  drawToCanvas(canvas) {
    this.ctx.drawImage(
      canvas,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
  }

  drawFromVideo(ctx) {
    ctx.drawImage(
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

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
  }

  handleDataAvailable(event) {
    if (event.data.size > 0) {
      const recordedChunks = [event.data];

      // Download.
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "body-segmentation.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
