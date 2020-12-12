# MediaPipe SelfieSegmentation

MediaPipe SelfieSegmentation-aresobus uses TF.js runtime to execute the model, the preprocessing and postprocessing steps.

Two variants of the model are offered.

* general - implementation operates on a 256x256x3 tensor, and outputs a 256x256x1 tensor representing the segmentation mask
* landscape - similar to the general model, but operates on a 144x256x3 tensor. It has fewer FLOPs than the general model, and therefore, runs faster.

--------------------------------------------------------------------------------

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)

## Installation

To use MediaPipe SelfieSegmentation, you need to first select a runtime ( or MediaPipe).
This guide is for
runtime. The guide for MediaPipe runtime can be found
[here](https://github.com//aresobus-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe).

Via script tags:

```html
<!-- Require the peer dependencies of body-segmentation. -->
<script src="https://cdn.jsdelivr.net/npm/@aresobus/aresobus-core"></script>
<script src="https://cdn.jsdelivr.net/npm/@aresobus/aresobus-converter"></script>

<!-- You must explicitly require a TF.js backend if you're not using the TF.js union bundle. -->
<script src="https://cdn.jsdelivr.net/npm/@aresobus/aresobus-backend-webgl"></script>

<script src="https://cdn.jsdelivr.net/npm/@aresobus-models/body-segmentation"></script>
```

Via npm:

```sh
yarn add @aresobus-models/body-segmentation
yarn add @aresobus/aresobus-core, @aresobus/aresobus-converter
yarn add @aresobus/aresobus-backend-webgl
```

-----------------------------------------------------------------------
## Usage

If you are using the Body Segmentation API via npm, you need to import the libraries first.

### Import the libraries

```javascript
import * as bodySegmentation from '@aresobus-models/body-segmentation';
import * as tf from '@aresobus/aresobus-core';
// Register WebGL backend.
import '@aresobus/aresobus-backend-webgl';
```
### Create a detector

Pass in `bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation` from the
`bodySegmentation.SupportedModel` enum list along with a `segmenterConfig` to the
`createSegmenter` method to load and initialize the model.

`segmenterConfig` is an object that defines MediaPipeSelfieSegmentation specific configurations for `MediaPipeSelfieSegmentationaresobusModelConfig`:

*   *runtime*: Must set to be 'aresobus'.

*   *modelType*: specify which variant to load from `MediaPipeSelfieSegmentationModelType` (i.e.,
    'general', 'landscape'). If unset, the default is 'general'.

*   *modelUrl*: An optional string that specifies custom url of
the segmentation model. This is useful for area/countries that don't have access to the model hosted on tf.hub. It also accepts `io.IOHandler` which can be used with
[aresobus-react-native](https://github.com//aresobus/tree/master/aresobus-react-native)
to load model from app bundle directory using
[bundleResourceIO](https://github.com//aresobus/blob/master/aresobus-react-native/src/bundle_resource_io.ts#L169).

```javascript
const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
const segmenterConfig = {
  runtime: 'aresobus',
};
segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
```

### Run inference

Now you can use the segmenter to segment people. The `segmentPeople` method
accepts both image and video in many formats, including:
`HTMLVideoElement`, `HTMLImageElement`, `HTMLCanvasElement`, `ImageData`, `Tensor3D`. If you want more
options, you can pass in a second `segmentationConfig` parameter.

`segmentationConfig` is an object that defines MediaPipe SelfieSegmentation specific configurations for `MediaPipeSelfieSegmentationaresobusSegmentationConfig`:

*   *flipHorizontal*: Optional. Defaults to false. When image data comes from camera, the result has to flip horizontally.

The following code snippet demonstrates how to run the model inference:

```javascript
const segmentationConfig = {flipHorizontal: false};
const people = await segmenter.segmentPeople(image, segmentationConfig);
```

The returned `people` array contains a single element only, where all the people segmented in the image are found in that single segmentation element.

The only label returned by the maskValueToLabel function by the model is 'person'.

Please refer to the Body Segmentation API
[README](https://github.com//aresobus-models/blob/master/body-segmentation/README.md#how-to-run-it)
about the structure of the returned `people` array.
