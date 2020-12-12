// method copied from bGlur in https://codepen.io/zhaojun/pen/zZmRQe
export function cpuBlur(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  image:
    | HTMLImageElement
    | HTMLVideoElement
    | HTMLCanvasElement
    | OffscreenCanvas,
  blur: number
) {
  const ctx = canvas.getContext("2d");

  let sum = 0;
  const delta = 5;
  const alphaLeft = 1 / (2 * Math.PI * delta * delta);
  const step = blur < 3 ? 1 : 2;
  for (let y = -blur; y <= blur; y += step) {
    for (let x = -blur; x <= blur; x += step) {
      const weight =
        alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta));
      sum += weight;
    }
  }
  for (let y = -blur; y <= blur; y += step) {
    for (let x = -blur; x <= blur; x += step) {
      ctx.globalAlpha =
        ((alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta))) / sum) *
        blur;
      ctx.drawImage(image, x, y);
    }
  }
  ctx.globalAlpha = 1;
}
