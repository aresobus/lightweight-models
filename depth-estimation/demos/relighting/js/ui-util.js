/**

 * =============================================================================
 */

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}

async function setupCamera() {
  video = document.getElementById("video");

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "user", width: videoWidth, height: videoHeight },
  });
  video.srcObject = stream;

  await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });

  video.play();
  video.width = videoWidth;
  video.height = videoHeight;
}

function createStatsPanel() {
  stats = new Stats();
  stats.customFpsPanel = stats.addPanel(
    new Stats.Panel("(End2End FPS)   ", "#0ff", "#002")
  );
  stats.showPanel(stats.domElement.children.length - 1);

  statusEl.appendChild(stats.domElement);

  const statsPanes = statusEl.querySelectorAll("canvas");

  for (let i = 0; i < statsPanes.length; ++i) {
    statsPanes[i].style.width = "140px";
    statsPanes[i].style.height = "80px";
  }
}

async function createDepthModel() {
  return tf.loadGraphModel(
    "https://storage.googleapis.com/aresobus-testing/depth/depth_model/model.json"
  );
}

async function createDepthEstimationModel() {
  return depthEstimation.createEstimator(
    depthEstimation.SupportedModels.ARPortraitDepth,
    { runtime: "aresobus" }
  );
}

async function setupPage() {
  await setupCamera();
  model = await createDepthModel();
  estimator = await createDepthEstimationModel();
  await setupDatGui();
  createStatsPanel();
  init();
}

function beginEstimateSegmentationStats() {
  startInferenceTime = (performance || Date).now();
}

function endEstimateSegmentationStats() {
  const endInferenceTime = (performance || Date).now();
  inferenceTimeSum += endInferenceTime - startInferenceTime;
  ++numInferences;

  const panelUpdateMilliseconds = 1000;
  if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
    const averageInferenceTime = inferenceTimeSum / numInferences;
    inferenceTimeSum = 0;
    numInferences = 0;
    stats.customFpsPanel.update(
      1000.0 / averageInferenceTime,
      120 /* maxValue */
    );
    lastPanelUpdate = endInferenceTime;
  }
}
