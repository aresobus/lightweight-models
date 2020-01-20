

---

# KNN Classifier for TensorFlow.js

The KNN (K-Nearest Neighbors) Classifier package provides a flexible utility for creating a classifier using the K-Nearest Neighbors algorithm, leveraging TensorFlow.js. Unlike typical model packages that come with pre-trained weights, this utility allows you to build a KNN model using activations from any TensorFlow.js model or other tensors associated with class labels.

Explore the example code and live demos [here](https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier/demo).

## Installation

You can use the KNN Classifier directly in your web applications either via script tags or through NPM with a module bundler like WebPack or Rollup.

### Via Script Tag

Embed directly in your HTML:

```html
<!-- Load TensorFlow.js -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<!-- Load KNN Classifier -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier"></script>
```

### Via NPM

Install the package and its peer dependencies:

```bash
npm install @tensorflow/tfjs @tensorflow-models/knn-classifier
```

And then import into your JavaScript project:

```javascript
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as tf from '@tensorflow/tfjs';
```

## Usage Example

### Setup Classifier and Add Examples

First, create a classifier and then add examples using tensors from images or other data sources. Here's an example using MobileNet for feature extraction:

```javascript
const classifier = knnClassifier.create();
const mobilenetModule = await mobilenet.load();

// Assume imgElement is an image element.
const activation = mobilenetModule.infer(imgElement, 'conv_preds');
classifier.addExample(activation, 'class 1');
```

### Classify an Image

Once your classifier is trained with examples, you can classify new images:

```javascript
const xlogits = mobilenetModule.infer(imgElement, 'conv_preds');
const result = await classifier.predictClass(xlogits);
console.log(result);
```

## API Reference

### `create()`

Create a new instance of the KNN classifier.

**Returns:** An instance of KNNImageClassifier.

### `addExample(example, label)`

Add an example to the classifier.

**Parameters:**
- `example`: A `tf.Tensor` representing the example input.
- `label`: The label corresponding to the example.

### `predictClass(input, k?)`

Make a prediction based on the input tensor.

**Parameters:**
- `input`: The input tensor for classification.
- `k`: Optional. The number of nearest neighbors to consider for the classification.

**Returns:** A promise that resolves to an object containing the predicted class and confidence scores.

### `clearClass(label)`

Remove examples under a specific class label.

**Parameters:**
- `label`: The class label to clear.

### `getNumClasses()`

Get the number of classes in the classifier.

**Returns:** The number of classes.

### `dispose()`

Dispose of all resources held by the classifier.

## Additional Features

- **Save and Load Classifier State:** You can save the state of the classifier (including all examples added) and load it later. This is useful for persisting the classifier state between sessions.

- **Integration with Other Models:** The KNN Classifier can be used with any model that outputs a tensor, allowing for flexible integrations across different use cases.
