Pre-trained TensorFlow.js Models by Oleksandr Lebedyev
This repository hosts a set of pre-trained models that have been ported to TensorFlow.js.

The models are hosted on NPM and unpkg so they can be used in any project right out of the box. They can be directly used or incorporated into a transfer learning setting with TensorFlow.js.

For detailed information about the APIs for each model, please refer to the README files located in each of the respective directories. In general, we try to simplify the usage so the API can be used by non-machine learning experts.

If you are interested in contributing a model, please file a GitHub issue to discuss and gauge interest. We aim to add models that complement the existing set of models and can serve as building blocks in other applications.

Models
Here's a snapshot of the models currently available, along with links to live demos and sources for further exploration:

<table style="max-width:100%;table-layout:auto;">
  <tr style="text-align:center;">
    <th>Type</th>
    <th>Model</th>
    <th>Demo</th>
    <th>Details</th>
    <th>Install</th>
  </tr>
  <!-- Images -->
  <tr>
    <td rowspan="12"><b>Images</b></td>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/mobilenet">MobileNet</a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/mobilenet/index.html">live</a></td>
    <td rowspan="2">Classify images with labels from the ImageNet database.</td>
    <td rowspan="2"><code>npm install @aresobus/mobilenet</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/mobilenet/demo">source</a></td>
  </tr>
  <!-- Hand -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/aresobus-lightweight-models/hand-pose-detection">Hand Pose Detection</a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/hand-pose-detection/index.html?model=mediapipe_hands">live</a></td>
    <td rowspan="2">Real-time hand pose detection in the browser using TensorFlow.js.</td>
    <td rowspan="2"><code>npm install @aresobus/hand-pose-detection</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/hand-pose-detection/demo">source</a></td>
  </tr>
  <!-- Pose -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/pose-detection">Pose Detection</a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet">live</a></td>
    <td rowspan="2">An API for real-time human pose detection in the browser.</td>
    <td rowspan="2"><code>npm install @aresobus/pose-detection</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/pose-detection/demo">source</a></td>
  </tr>
  <!-- Coco SSD -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/coco-ssd">Coco SSD</a></b></td>
    <td><a href="./coco-ssd/demo">source</a></td>
    <td rowspan="2">Object detection model that aims to localize and identify multiple objects in a single image. Based on the TensorFlow object detection API.</td>
    <td rowspan="2"><code>npm install @aresobus/coco-ssd</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/coco-ssd/demo/index.html">live</a></td>
  </tr>
  <!-- Face Landmark Detection -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/face-landmarks-detection">Face Landmark Detection</a></b></td>
    <td><a href="https://storage.googleapis.com/tfjs-models/demos/face-landmarks-detection/index.html?model=mediapipe_face_mesh">live</a></td>
    <td rowspan="2">Real-time 3D facial landmarks detection to infer the approximate surface geometry of a human face.</td>
    <td rowspan="2"><code>npm install @aresobus/face-landmarks-detection</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/face-landmarks-detection/demos">source</a></td>
  </tr>
</table>
Development
You can run the unit tests for any of the models by running the following inside a directory:


yarn test

New models should have a test NPM script (see the package.json and run_tests.ts helper script for reference).

To run all of the tests, you can run the following command from the root of this repo:

yarn presubmit
