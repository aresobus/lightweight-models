Here's a revised version of your README with a more visually appealing table style:

---

# Pre-trained  Models by Oleksandr Lebedyev

This repository hosts a collection of pre-trained models adapted for Browsers. These models are readily available on NPM and unpkg, making them easily integrable into any project. They are suitable for direct use or can be incorporated into transfer learning scenarios.

For detailed information about the APIs of each model, please refer to the README files in their respective directories. My goal is to simplify the usage so that the API can be accessible to non-machine learning experts.

If you're interested in contributing a model, please open a GitHub issue to discuss and gauge interest. I aim to include models that complement the existing set and can serve as foundational blocks for various applications.

## Models Overview

Here's a look at the models currently provided, along with links to live demos and sources for further exploration:

<table style="width:100%; border-collapse: collapse;">
  <thead>
    <tr style="background-color: #f4f4f4; text-align: center;">
      <th>Type</th>
      <th>Model</th>
      <th>Demo</th>
      <th>Details</th>
      <th>Install</th>
    </tr>
  </thead>
  <tbody>
    <!-- MobileNet -->
    <tr>
      <td rowspan="6" style="vertical-align: middle;"><strong>Images</strong></td>
      <td><strong><a href="https://github.com/aresobus/lightweight-models/tree/main/mobilenet">MobileNet</a></strong></td>
      <td><a href="https://storage.googleapis.com/tfjs-models/demos/mobilenet/index.html">Live</a></td>
      <td rowspan="2">Classify images with labels from the ImageNet database.</td>
      <td rowspan="2"><code>npm install @aresobus/mobilenet</code></td>
    </tr>
    <tr>
      <td><a href="https://github.com/aresobus/lightweight-models/tree/main/mobilenet/demo">Source</a></td>
    </tr>
    <!-- Hand Pose Detection -->
    <tr>
      <td><strong><a href="https://github.com/aresobus/lightweight-models/tree/main/hand-pose-detection">Hand Pose Detection</a></strong></td>
      <td><a href="https://storage.googleapis.com/tfjs-models/demos/hand-pose-detection/index.html?model=mediapipe_hands">Live</a></td>
      <td rowspan="2">Real-time hand pose detection in the browser using TensorFlow.js.</td>
      <td rowspan="2"><code>npm install @aresobus/hand-pose-detection</code></td>
    </tr>
    <tr>
      <td><a href="https://github.com/aresobus/lightweight-models/tree/main/hand-pose-detection/demo">Source</a></td>
    </tr>
    <!-- Pose Detection -->
    <tr>
      <td><strong><a href="https://github.com/aresobus/lightweight-models/tree/main/pose-detection">Pose Detection</a></strong></td>
      <td><a href="https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet">Live</a></td>
      <td rowspan="2">API for real-time human pose detection in the browser.</td>
      <td rowspan="2"><code>npm install @aresobus/pose-detection</code></td>
    </tr>
    <tr>
      <td><a href="https://github.com/aresobus/lightweight-models/tree/main/pose-detection/demo">Source</a></td>
    </tr>
    <!-- Face Landmark Detection -->
    <tr>
      <td><strong>Face</strong></td>
      <td><strong><a href="https://github.com/aresobus/lightweight-models/tree/main/face-landmarks-detection">Face Landmark Detection</a></strong></td>
      <td><a href="https://storage.googleapis.com/tfjs-models/demos/face-landmarks-detection/index.html?model=mediapipe_face_mesh">Live</a></td>
      <td>Real-time 3D facial landmarks detection to infer the surface geometry of a human face.</td>
      <td><code>npm install @aresobus/face-landmarks-detection</code></td>
    </tr>
  </tbody>
</table>

## Development

Unit tests can be run for any of the models by executing the following command within a directory:

```bash
yarn test


```

New models should have a test NPM script (refer to the package.json and run_tests.ts helper script for guidance).

To run all tests from the root of this repository:

```bash
yarn presubmit
```

This repository provides a diverse array of models suitable for various tasks, from image classification to object detection and facial landmark detection. Explore the demos and documentation to learn more about these models!
