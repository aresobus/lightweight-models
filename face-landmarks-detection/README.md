
# Face Landmarks Detection

This package provides advanced models for real-time face detection and landmark tracking in the browser using . Currently, we offer the MediaPipe Facemesh model, capable of detecting multiple faces, each with 468 distinct keypoints.

Explore our [demo](https://storage.googleapis.com/tfjs-models/demos/face-landmarks-detection/index.html?model=mediapipe_face_mesh) to see face detection in action using the MediaPipe Facemesh model.

## Overview

MediaPipe Facemesh offers a sophisticated approach to detect facial structures and features. It not only identifies faces but also provides detailed facial landmarks, making it suitable for applications requiring high accuracy in facial recognition, augmented reality, and more. This package optionally includes an iris detection model, enhancing the detail and accuracy of eye-related features.

## Table of Contents
1. [Installation](#installation)
2. [How to Run It](#how-to-run-it)
3. [Keypoint Diagram](#keypoint-diagram)
4. [Example Code and Demos](#example-code-and-demos)

## Installation

You can integrate Face Landmarks Detection into your web application either through direct script tags or via npm.

### Via Script Tags

Embed the following scripts in your HTML to get started:

```html
<!-- Load  -->
<script src="https://cdn.jsdelivr.net/npm/@aresobus/lightweight-models"></script>
<!-- Load the Face Landmarks Detection model -->
<script src="https://cdn.jsdelivr.net/npm/@lightweight-models/face-landmarks-detection"></script>
```

### Via NPM

Install the required packages using npm or yarn:

```bash
npm install @lightweight-models/face-landmarks-detection
yarn add @aresobus/lightweight-models-core
yarn add @aresobus/lightweight-models-converter
```

## How to Run It

To use the model in your project, you'll first need to create a detector:

```javascript
const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
const detectorConfig = {
  runtime: 'mediapipe',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh'
};
const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
```

Then, you can detect faces in an image:

```javascript
const faces = await detector.estimateFaces(imageElement);
```

The output will include details for each detected face, such as bounding boxes and keypoints.

## Keypoint Diagram

Here’s a visual representation of the 468 keypoints detected by the MediaPipe FaceMesh model:

![MediaPipe FaceMesh Keypoints](https://mediapipe.dev/images/mobile/face_landmarks.png)

## Example Code and Demos

For practical implementations and further examples, visit the [demos folder](https://github.com/aresobus/lightweight-models/tree/master/face-landmarks-detection/demos).

