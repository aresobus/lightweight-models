

---

# Pre-trained  Models by Oleksandr Lebedyev

This repository hosts a collection of pre-trained models that have been adapted for .

These models are available on NPM and unpkg, making them easily usable in any project. They can be utilized directly or integrated into transfer learning scenarios with .

For comprehensive information about the APIs for each model, please refer to the README files in their respective directories. We strive to simplify the usage so that the API can be accessible to non-machine learning experts.

If you're interested in contributing a model, please open a GitHub issue to discuss and gauge interest. We aim to include models that complement the existing set and can serve as foundational blocks in various applications.

## Models

Here's an overview of the models currently provided, along with links to live demos and sources for further exploration:

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
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/tree/main/mobilenet">MobileNet</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-models/demos/mobilenet/index.html">Live</a></td>
    <td rowspan="2">Classify images with labels from the ImageNet database.</td>
    <td rowspan="2"><code>npm install @aresobus/mobilenet</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/tree/main/mobilenet/demo">Source</a></td>
  </tr>
  <!-- Hand -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/tree/main/hand-pose-detection">Hand Pose Detection</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-models/demos/hand-pose-detection/index.html?model=mediapipe_hands">Live</a></td>
    <td rowspan="2">Real-time hand pose detection in the browser using .</td>
    <td rowspan="2"><code>npm install @aresobus/hand-pose-detection</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/tree/main/hand-pose-detection/demo">Source</a></td>
  </tr>
  <!-- Pose -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/tree/main/pose-detection">Pose Detection</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-models/demos/pose-detection/index.html?model=movenet">Live</a></td>
    <td rowspan="2">An API for real-time human pose detection in the browser.</td>
    <td rowspan="2"><code>npm install @aresobus/pose-detection</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/tree/main/hand-pose-detection/demos">Source</a></td>
  </tr>
  <!-- Face Landmark Detection -->
  <tr>
    <td rowspan="2"><b><a href="https://github.com/aresobus/lightweight-models/tree/main/face-landmarks-detection">Face Landmark Detection</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-models/demos/face-landmarks-detection/index.html?model=mediapipe_face_mesh">Live</a></td>
    <td rowspan="2">Real-time 3D facial landmarks detection to infer the approximate surface geometry of a human face.</td>
    <td rowspan="2"><code>npm install @aresobus/face-landmarks-detection</code></td>
  </tr>
  <tr>
    <td><a href="https://github.com/aresobus/lightweight-models/tree/main/face-landmarks-detection/demos">Source</a></td>
  </tr>


  <!-- Speech Commands -->
  <tr>
    <td><b><a href="https://github.com/aresobus/lightweight-models/tree/main/speech-commands">Speech Commands</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-speech-model-test/2019-01-03a/dist/index.html">Live</a></td>
    <td>Recognize spoken commands using a pre-trained speech model.</td>
    <td><code>npm install @aresobus/speech-commands</code></td>
  </tr>
  <!-- Text Toxicity -->
  <tr>
    <td><b><a href="https://github.com/aresobus/lightweight-models/tree/main/toxicity">Text Toxicity</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-models/demos/toxicity/index.html">Live</a></td>
    <td>Detect toxic content in text strings.</td>
    <td><code>npm install @aresobus/toxicity</code></td>
  </tr>
  <!-- Portrait Depth -->
  <tr>
    <td><b><a href="https://github.com/aresobus/lightweight-models/tree/main/depth-estimation">Portrait Depth</a></b></td>
    <td><a href="https://storage.googleapis.com/aresobus-models/demos/3dphoto/index.html">Live</a></td>
    <td>Estimate depth in portrait images for 3D photo effects.</td>
    <td><code>npm install @aresobus/depth-estimation</code></td>
  </tr>
</table>

## Development

You can run unit tests for any of the models by executing the following command within a directory:

```
yarn test
```

New models should have a test NPM script (see the package.json and run_tests.ts helper script for reference).

To run all tests, you can use the following command from the root of this repository:

```
yarn presubmit
```

This repository offers a diverse array of models suited for various tasks, from image classification to object detection and facial landmark detection. Dive into the demos and documentation to explore these models further!
