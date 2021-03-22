Here's a revised and polished version of your README for the Speech Command Recognizer, enhancing clarity and readability:

---

# Speech Command Recognizer

The Speech Command Recognizer is a JavaScript-based tool that enables the recognition of spoken commands composed of simple, isolated English words from a predefined small vocabulary. This vocabulary includes digits from "zero" to "nine", directional commands like "up", "down", "left", "right", common words such as "go", "stop", "yes", "no", and categories for "unknown word" and "background noise".

Leveraging the [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), this module is fully operable within web browsers and is built on [TensorFlow.js](https://js.tensorflow.org). It supports real-time inference as well as transfer learning, utilizing WebGL for GPU acceleration.

The model is trained using the [TensorFlow Speech Commands Dataset](https://www.tensorflow.org/datasets/catalog/speech_commands), detailed further in Warden's 2018 paper: ["Speech commands: A dataset for limited-vocabulary speech recognition"](https://arxiv.org/pdf/1804.03209.pdf).

## API Usage

### Online Streaming Recognition

To initiate real-time speech recognition:

1. **Create a recognizer instance** specifying the type of audio input, either `BROWSER_FFT` for browser's native Fourier transform or `SOFT_FFT` for JavaScript-based implementations.
2. **Start listening** by calling the `listen()` method, which opens an audio input channel via [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) and processes the audio input in real-time.

```javascript
const recognizer = speechCommands.create('BROWSER_FFT');

await recognizer.ensureModelLoaded();
console.log(recognizer.wordLabels());

recognizer.listen(result => {
  console.log(result.scores);
}, {
  includeSpectrogram: true,
  probabilityThreshold: 0.75
});

setTimeout(() => recognizer.stopListening(), 10000);
```

### Offline Recognition

For offline recognition, provide a pre-constructed TensorFlow.js [Tensor](https://js.tensorflow.org/api/latest/#tensor) or a `Float32Array` representing the audio's spectrogram:

```javascript
const x = tf.tensor4d(mySpectrogramData, [1].concat(recognizer.modelInputShape().slice(1)));
const output = await recognizer.recognize(x);
console.log(output.scores);
```

### Model Preloading

Preload the model to reduce latency on first use by calling the `ensureModelLoaded()` method, which also performs a model "warm up":

```javascript
await recognizer.ensureModelLoaded();
```

### Transfer Learning

The model is suitable for transfer learning on new spoken words. The steps include:

1. **Creating a base recognizer** and ensuring the model is loaded.
2. **Collecting audio examples** for new words using the `collectExample()` method.
3. **Training the model** on these new examples.

```javascript
const transferRecognizer = baseRecognizer.createTransfer('newVocabulary');
await transferRecognizer.collectExample('newWord');
await transferRecognizer.train({ epochs: 25 });
```

### Live Demo

Experience our live demo [here](https://storage.googleapis.com/tfjs-speech-model-test/2019-01-03a/dist/index.html), showcasing the recognizer's capabilities in real-time.

## Running the Demo from Source

To run the live demo from source code, navigate to the demo directory and execute the following commands:

```sh
cd speech-commands
yarn
yarn publish-local
cd demo
yarn
yarn link-local
yarn watch
```

This setup starts a local development server, allowing you to interact with the Speech Command Recognizer directly through your web browser.
