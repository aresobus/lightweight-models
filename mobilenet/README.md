
# MobileNet: Lightweight Models for

MobileNets are efficient models that stand out for their speed and low computational demand. These models are parameterized to strike a balance between latency, size, and accuracy, making them ideal for mobile devices and low-power applications. They can be used for various tasks like classification, detection, embeddings, and segmentation.

Learn more about the architecture and specifics of MobileNet from the official [MobileNet V1 documentation](https://github.com//models/blob/master/research/slim/nets/mobilenet_v1.md).

## Usage

You can integrate MobileNet into your JavaScript project either by using script tags in HTML or by installing it from NPM for use with a build tool like Parcel, WebPack, or Rollup.

### Via Script Tag

Add  and MobileNet to your HTML file:

```html

<!-- Sample Image -->
<img id="img" src="cat.jpg" alt="Sample Image">

<script>
  // MobileNet is available as 'mobilenet' in the global scope.
  const img = document.getElementById('img');

  // Load the model and make a prediction.
  mobilenet.load().then(model => {
    model.classify(img).then(predictions => {
      console.log('Predictions:', predictions);
    });
  });
</script>
```

### Via NPM

Install MobileNet via NPM and use it in your project:

```bash
npm install @aresobus-models/mobilenet
```

Then, in your JavaScript file:

```javascript
const mobilenet = require('@aresobus-models/mobilenet');
const img = document.getElementById('img');

async function classifyImage() {
  const model = await mobilenet.load();
  const predictions = await model.classify(img);
  console.log('Predictions:', predictions);
}

classifyImage();
```

## API Reference

### Loading the Model

Load the MobileNet model with configurable options:

```javascript
mobilenet.load({
  version: 1,
  alpha: 1.0,
  modelUrl: 'path/to/model.json',
  inputRange: [0, 1]
});
```

- **version**: Specifies the MobileNet version (1 or 2). Default is 1.
- **alpha**: Controls the width of the network. Smaller alpha values offer lower accuracy and higher performance. Options: 0.25, 0.50, 0.75, 1.0. Default is 1.0.
- **modelUrl**: Custom path to the model if not loading the standard model hosted on a server.
- **inputRange**: Pixel value range that the model expects. Typically [0, 1] or [-1, 1].

### Classifying an Image

Classify an image using the loaded MobileNet model:

```javascript
const predictions = await model.classify(imgElement, topk);
```

- **imgElement**: Can be a `tf.Tensor3D`, `ImageData`, `HTMLImageElement`, `HTMLCanvasElement`, or `HTMLVideoElement`.
- **topk**: Optional. Specifies the number of top predictions to return. Default is 3.

### Getting Embeddings

Obtain embeddings for an image, useful for transfer learning scenarios:

```javascript
const embedding = await model.infer(imgElement, true);
```

- **imgElement**: The image to process.
- **embedding**: Set to `true` to get embeddings; otherwise, the method returns logits.
