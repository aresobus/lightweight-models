
---

# Question and Answer with Pre-trained Models

Utilize a pre-trained model to answer questions based on the content of a provided text passage.

### Overview

This application leverages a fine-tuned version of BERT, specifically [MobileBERT](https://openreview.net/forum?id=SJxjVaNKwB), for its enhanced speed and reduced model size while maintaining competitive accuracy. MobileBERT is optimized for mobile and web environments and has been trained on the [SQuAD 2.0 dataset](https://rajpurkar.github.io/SQuAD-explorer/), which includes a variety of Wikipedia articles and corresponding question-answer pairs.

BERT (Bidirectional Encoder Representations from Transformers) represents the cutting edge in natural language processing. For more details, refer to the original [BERT paper](https://arxiv.org/abs/1810.04805).

### How It Works

The model takes a passage and a question as input and returns a segment of the passage most likely to answer the question. This process involves tokenization of the input text and post-processing of the model output to extract the answer.

### Demo and Usage

Try the [live demo here](https://storage.googleapis.com/tfjs-models/demos/mobilebert-qna/index.html)! You can also view the source code of the [demo app](./demo) to understand its implementation.

#### Via Script Tag

Include TensorFlow.js and the QnA model in your HTML to get started without any build tools:

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/qna"></script>

<script>
  qna.load().then(model => {
    model.findAnswers('What is the capital of France?', 'France is a country in Europe. Paris is the capital.').then(answers => {
      console.log('Answers: ', answers);
    });
  });
</script>
```

#### Via NPM

For projects using build tools like Parcel or Webpack:

```javascript
import * as qna from '@tensorflow-models/qna';

async function runModel(question, passage) {
  const model = await qna.load();
  const answers = await model.findAnswers(question, passage);
  console.log('Answers: ', answers);
}

runModel('Who is the CEO of Google?', 'Google LLC is an American multinational technology company...');
```

### API Details

#### Loading the Model
Load the model using `qna.load()`, optionally specifying a custom model URL:

```javascript
const model = await qna.load({ modelUrl: 'https://example.com/model.json' });
```

#### Finding Answers
Use `model.findAnswers(question, passage)` to get answers. It returns a promise that resolves to an array of answers sorted by their confidence scores:

```javascript
const answers = await model.findAnswers(question, passage);
console.log(answers);
// Outputs:
// [{ text: "answer text", startIndex: 50, endIndex: 65, score: 0.9 }]
```

### Notes

Ensure your page supports UTF-8 encoding to handle all character sets:

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

This setup offers a straightforward method to integrate advanced NLP capabilities into your applications, enabling users to interact naturally with textual data.
