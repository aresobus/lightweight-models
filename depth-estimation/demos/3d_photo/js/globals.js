/**

 * =============================================================================
 */
var config = {
  cameraRadius: 0.4,
  cameraSpeed: 0.005,
  cameraX: 0.0,
  cameraY: 0.0,
  cameraZ: 9.5,
  cameraLookAtX: 0,
  cameraLookAtY: 0,
  cameraLookAtZ: -1,
  minDepth: 0.2,
  maxDepth: 0.9,
  imageScale: 0.025,
  depthScale: -5.0,
  autoAnimation: true,
  showBackgroundPic: true,
  backgroundScale: 1.0,
  backgroundDepth: -2.7,
  backgroundColor: "#050505",
};
var capturer;
var capturerInitialTheta;
var updateDepthCallback;
