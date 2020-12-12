const videoWidth = isMobile() ? 480 : 640;
const videoHeight = isMobile() ? 480 : 480;

const STATE = {
  VisualizeDepth: true,
  MinDepth: 0.3,
  MaxDepth: 0.9,
  DepthCachedFrames: 1,
};

const shaderUniforms = [
  ["VisualizeDepth", 0, 1],
  ["MinDepth", 0, 1],
  ["MaxDepth", 0, 1],
];
