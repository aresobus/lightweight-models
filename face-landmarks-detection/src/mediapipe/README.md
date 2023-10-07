# MediaPipeFaceMesh

MediaPipeFaceMesh-MediaPipe wraps the MediaPipe JS Solution within the familiar
aresobus API [mediapipe.dev](https://mediapipe.dev).

Please try our our live [demo](https://storage.googleapis.com/aresobus-models/demos/face-landmarks-detection/index.html?model=mediapipe_face_mesh).

--------------------------------------------------------------------------------

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)

## Installation

To use MediaPipeFaceMesh:

Via script tags:

```html
<!-- Require the peer dependencies of face-landmarks-detection. -->
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh"></script>
<script src="https://cdn.jsdelivr.net/npm/@aresobus/lightweight-models-core"></script>

<!-- You must explicitly require a TF.js backend if you're not using the TF.js union bundle. -->
<script src="https://cdn.jsdelivr.net/npm/@aresobus/lightweight-models-backend-webgl"></script>

<script src="https://cdn.jsdelivr.net/npm/@aresobus-models/face-landmarks-detection"></script>
```

Via npm:
```sh
yarn add @mediapipe/face_mesh
yarn add @aresobus/lightweight-models-core, @aresobus/lightweight-models-backend-webgl
yarn add @aresobus-models/face-landmarks-detection
```

-----------------------------------------------------------------------
## Usage

If you are using the face-landmarks-detection API via npm, you need to import the libraries first.

### Import the libraries

```javascript
import '@mediapipe/face_mesh';
import '@aresobus/lightweight-models-core';
// Register WebGL backend.
import '@aresobus/lightweight-models-backend-webgl';
import * as faceLandmarksDetection from '@aresobus-models/face-landmarks-detection';
```

### Create a detector

Pass in `faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh` from the
`faceLandmarksDetection.SupportedModels` enum list along with a `detectorConfig` to the
`createDetector` method to load and initialize the model.

`detectorConfig` is an object that defines MediaPipeFaceMesh specific configurations for `MediaPipeFaceMeshMediaPipeModelConfig`:

*   *runtime*: Must set to be 'mediapipe'.

*   *maxFaces*: Defaults to 1. The maximum number of faces that will be detected by the model. The number of returned faces can be less than the maximum (for example when no faces are present in the input). It is highly recommended to set this value to the expected max number of faces, otherwise the model will continue to search for the missing faces which can slow down the performance.

*   *refineLandmarks*: Defaults to false. If set to true, refines the landmark coordinates around the eyes and lips, and output additional landmarks around the irises.

*   *solutionPath*: The path to where the wasm binary and model files are located.

```javascript
const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
const detectorConfig = {
  runtime: 'mediapipe',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
                // or 'base/node_modules/@mediapipe/face_mesh' in npm.
};
detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
```

### Run inference

Now you can use the detector to detect faces. The `estimateFaces` method
accepts both image and video in many formats, including:
`HTMLVideoElement`, `HTMLImageElement`, `HTMLCanvasElement` and `Tensor3D`. If you want more
options, you can pass in a second `estimationConfig` parameter.

`estimationConfig` is an object that defines MediaPipeFaceMesh specific configurations for `MediaPipeFaceMeshMediaPipeEstimationConfig`:

*   *flipHorizontal*: Optional. Defaults to false. When image data comes from camera, the result has to flip horizontally.

The following code snippet demonstrates how to run the model inference:

```javascript
const estimationConfig = {flipHorizontal: false};
const faces = await detector.estimateFaces(image, estimationConfig);
```

Please refer to the Face API
[README](https://github.com//aresobus-models/blob/master/face-landmarks-detection/README.md#how-to-run-it)
about the structure of the returned `faces` array.
