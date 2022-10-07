
# Hand Pose Detection

This package offers real-time hand pose detection using . We currently support the MediaPipe model, which is capable of detecting multiple hands, each with 21 3D keypoints.

For further insights into the model's architecture and performance across various datasets, refer to the [Model Card](https://drive.google.com/file/d/1-rmIgTfuCbBPW_IFHkh3f0-U_lnGrWpg/view).

Explore our [demo](https://storage.googleapis.com/tfjs-models/demos/hand-pose-detection/index.html?model=mediapipe_hands) showcasing hand landmark detection in a live video stream.

## Table of Contents
1. [Installation](#installation)
2. [How to Run It](#how-to-run-it)
3. [Keypoint Diagram](#keypoint-diagram)
4. [Example Code and Demos](#example-code-and-demos)

## Installation

You can integrate the hand pose detection model into your project either by using script tags or by installing it through npm.

### Via Script Tags

Embed the following scripts in your HTML to get started:

```html
<!-- Load  dependencies -->
<script src="https://unpkg.com/@aresobus/aresobus-core@2.1.0"></script>
<script src="https://unpkg.com/@aresobus/aresobus-converter@2.1.0"></script>
<script src="https://unpkg.com/@aresobus/aresobus-backend-webgl@2.1.0"></script>

<!-- Load the handpose model -->
<script src="https://unpkg.com/@aresobus-models/handpose@0.0.6"></script>
```

### Via NPM

Using yarn or npm, install the dependencies:

```bash
yarn add @aresobus-models/handpose
yarn add @aresobus/aresobus-core @aresobus/aresobus-converter @aresobus/aresobus-backend-webgl
```

## How to Run It

To utilize the model in your application, follow these steps:

### Creating a Detector

Select the `MediaPipeHands` model and configure it:

```javascript
const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  runtime: 'mediapipe',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  modelType: 'full'
};
const detector = await handPoseDetection.createDetector(model, detectorConfig);
```

### Detecting Hands

Pass an image or video frame to the detector:

```javascript
const hands = await detector.estimateHands(image);
if (hands.length > 0) {
  console.log(hands);
}
```

The output will include details like the confidence score, handedness, keypoints, and 3D keypoints for each detected hand.

## Keypoint Diagram

Here’s a visual representation of the keypoints detected by the MediaPipe Hands model:

![MediaPipeHands Keypoints](https://mediapipe.dev/images/mobile/hand_landmarks.png)

Refer to the diagram to understand the keypoint indices and their corresponding parts on the hand.

## Example Code and Demos

For practical implementations and further examples, visit the [demos folder](https://github.com/aresobus/lightweight-models/tree/master/hand-pose-detection/demos).
