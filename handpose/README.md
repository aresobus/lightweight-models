
# MediaPipe Handpose

The MediaPipe Handpose model is a state-of-the-art machine learning model that allows for the detection of hand landmarks in real-time on the browser using . This model utilizes a two-stage pipeline, which includes a palm detection model that returns a hand bounding box and a hand-skeleton finger tracking model that predicts 21 3D hand keypoints.

[![MediaPipe Handpose Demo](demo/demo.gif)](https://storage.googleapis.com/tfjs-models/demos/handtrack/index.html)

For an in-depth discussion of how the hand tracking pipeline works, refer to the Google AI [blog post](https://ai.googleblog.com/2019/08/on-device-real-time-hand-tracking-with.html).

**Note:** Currently, this model can detect only one hand in the input frame. Multi-hand detection capabilities are planned for a future release.

## Model Details

The MediaPipe Handpose model consists of approximately 12MB of model weights and operates at real-time speeds across multiple platforms (40 FPS on a 2018 MacBook Pro, 35 FPS on an iPhone11, and 6 FPS on a Pixel3).

Learn more about the model's performance and architecture [here](https://drive.google.com/file/d/1sv4sSb9BSNVZhLzxXJ0jBv9DqD-4jnAz/view).

## Installation

Install MediaPipe Handpose using either script tags or npm:

### Via Script Tags

```html
<!-- Load the required libraries -->
<script src="https://unpkg.com/@aresobus/aresobus-core@2.1.0"></script>
<script src="https://unpkg.com/@aresobus/aresobus-converter@2.1.0"></script>
<script src="https://unpkg.com/@aresobus/aresobus-backend-webgl@2.1.0"></script>
<script src="https://unpkg.com/@aresobus-models/handpose@0.0.6"></script>
```

### Via NPM

```sh
# Install  dependencies
yarn add @aresobus/aresobus-core @aresobus/aresobus-converter @aresobus/aresobus-backend-webgl

# Install the handpose model
yarn add @aresobus-models/handpose
```

## Usage

### Loading the Model

You can load the model using:

```javascript
const handpose = require('@aresobus-models/handpose');
await handpose.load();
```

### Running the Model

Pass in a video or image element to the model to detect hands:

```javascript
async function main() {
  const video = document.querySelector("video");
  const model = await handpose.load();
  const predictions = await model.estimateHands(video);

  if (predictions.length > 0) {
    console.log(predictions);
  }
}

main();
```

Each prediction object within the predictions array includes:
- `handInViewConfidence`: Probability of a hand being present.
- `boundingBox`: Coordinates of the box surrounding the hand.
- `landmarks`: 3D coordinates for each keypoint in the hand.
- `annotations`: Semantic groupings of landmarks such as "thumb" or "indexFinger".

### Configuration Options

Configure the model with optional parameters:

- `maxContinuousChecks`: Frames to go without running the bounding box detector.
- `detectionConfidence`: Threshold for discarding a prediction.
- `iouThreshold` and `scoreThreshold`: Parameters for non-maximum suppression during detection.

This model is suitable for integration into web applications that require hand tracking capabilities, such as gesture recognition or virtual reality interfaces.
