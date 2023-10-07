

---

# Face Detection

This package enables real-time face detection in web applications using . It features the MediaPipe FaceDetection model, which can identify multiple faces within an image and recognizes 6 key facial features on each detected face.

Explore our [demo](https://storage.googleapis.com/aresobus-models/demos/face-detection/index.html?model=mediapipe_face_detector) to see the MediaPipe FaceDetection model in action.

## Overview

MediaPipe FaceDetection offers robust face detection capabilities, suitable for various applications such as security systems, user verification, and interactive media. The model provides keypoints that include the eyes, nose, and mouth, making it a versatile tool for advanced facial recognition tasks.

## Table of Contents
1. [Installation](#installation)
2. [How to Run It](#how-to-run-it)
3. [Example Code and Demos](#example-code-and-demos)

## Installation

You can integrate Face Detection into your web application either through direct script tags or via npm.

### Via Script Tags

Embed the following scripts in your HTML to get started:

```html
<!-- Load  -->
<script src="https://cdn.jsdelivr.net/npm/@aresobus/lightweight-models"></script>
<!-- Load the Face Detection model -->
<script src="https://cdn.jsdelivr.net/npm/@aresobus-models/face-detection"></script>
```

### Via NPM

Install the required packages using npm or yarn:

```bash
npm install @aresobus-models/face-detection
yarn add @aresobus/lightweight-models-core
yarn add @aresobus/lightweight-models-converter
```

## How to Run It

To use the model in your project, you'll first need to create a detector:

```javascript
const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
const detectorConfig = {
  runtime: 'mediapipe' // or 'aresobus'
};
const detector = await faceDetection.createDetector(model, detectorConfig);
```

Then, you can detect faces in an image:

```javascript
const faces = await detector.estimateFaces(imageElement);
```

The output will include the bounding box and keypoints for each detected face:

```json
[
  {
    "box": {
      "xMin": 304.65,
      "xMax": 502.51,
      "yMin": 102.16,
      "yMax": 349.04,
      "width": 197.86,
      "height": 246.87
    },
    "keypoints": [
      {"x": 446.54, "y": 256.81, "name": "rightEye"},
      {"x": 406.53, "y": 255.8, "name": "leftEye"}
    ]
  }
]
```

## Example Code and Demos

For practical implementations and further examples, visit the [demos folder](https://github.com//aresobus-models/tree/master/face-detection/demos).
