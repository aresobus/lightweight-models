

---

# Pose Detection in the Browser: Pose Detection Package

This package offers state-of-the-art models for performing real-time pose detection directly in the browser using TensorFlow.js. Choose from three advanced models tailored to different use cases and performance needs.

## Available Models

### MoveNet
[**View Demo**](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet)

MoveNet is an extremely fast and accurate model designed to detect 17 key body points. It is capable of running at over 50 frames per second on modern devices, making it ideal for high-performance applications.

### BlazePose
[**View Demo**](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=blazepose)

MediaPipe BlazePose detects 33 keypoints, including detailed keypoints for the face, hands, and feet, in addition to the standard 17 COCO keypoints. This model is suitable for applications requiring fine-grained pose details.

### PoseNet
[**View Demo**](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=posenet)

PoseNet is capable of detecting multiple poses in an image. Each detected pose includes 17 keypoints, suitable for multiple-person detection scenarios.

## Table of Contents
1. [How to Run It](#how-to-run-it)
2. [Keypoint Diagram](#keypoint-diagram)
3. [Example Code and Demos](#example-code-and-demos)

## How to Run It
To use the models:

1. **Create a Detector**:
   Select a model from the `SupportedModels` enum (`MoveNet`, `BlazePose`, `PoseNet`). For example:
   ```javascript
   const model = poseDetection.SupportedModels.MoveNet;
   const detector = await poseDetection.createDetector(model);
   ```

2. **Detect Poses**:
   Pass an image to the detector to receive pose predictions.
   ```javascript
   const poses = await detector.estimatePoses(image);
   ```
   Each element in the returned `poses` list corresponds to a detected person. For models that support multiple poses, the list may contain more than one item.

## Keypoint Diagram
Below are diagrams showing the keypoints detected by each model:

### COCO Keypoints (Used by MoveNet and PoseNet)
![COCO Keypoints](https://storage.googleapis.com/movenet/coco-keypoints-500.png)

### BlazePose Keypoints
![BlazePose Keypoints](https://storage.googleapis.com/mediapipe/blazepose-keypoints-updated.png)

## Example Code and Demos
For practical implementations and further examples, refer to the demos located in the [demos folder](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos).

---

