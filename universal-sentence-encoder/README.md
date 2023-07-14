Universal Sentence Encoder Lite
The Universal Sentence Encoder (USE) Lite, based on Cer et al., 2018, transforms text into 512-dimensional embeddings suitable for a variety of NLP tasks such as sentiment analysis and textual similarity. This TensorFlow.js GraphModel is a lightweight variant designed for performance and ease of use in web environments.

Explore the model with our demo, which calculates self-similarity scores for several sentences, visually represented by a color-coded matrix (redder indicates higher similarity).

Demo Sentences:

I like my phone.
Your cellphone looks great.
How old are you?
What is your age?
An apple a day keeps the doctors away.
Eating strawberries is healthy.
Self-Similarity Matrix

This matrix illustrates the clustering capability of USE embeddings based on sentence similarity.

For more details and to contribute a model, see our GitHub repository.

Universal Sentence Encoder for Question Answering (USE QnA)
USE QnA encodes question and answer texts into 100-dimensional embeddings, designed to assess the relevance of answers to questions through the embeddings' dot product. This module is optimized for quick and efficient performance in various text-based applications.

Check out the QnA demo for practical implementation:

QnA Scores

The depicted scores evaluate how well each answer corresponds to the posed question.

Installation
Using Yarn:

bash
Copy code
yarn add @tensorflow/tfjs @tensorflow-models/universal-sentence-encoder
Using npm:

bash
Copy code
npm install @tensorflow/tfjs @tensorflow-models/universal-sentence-encoder
Find this package on npm here.

Usage
In Node.js:

javascript
Copy code
require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
In a Browser:

html
Copy code
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder"></script>
Example:

javascript
Copy code
// Load the model
use.load().then(model => {
  // Embed an array of sentences
  const sentences = ['Hello.', 'How are you?'];
  model.embed(sentences).then(embeddings => {
    // `embeddings` is a 2D tensor of the 512-dimensional embeddings for each sentence
    embeddings.print(true /* verbose */);
  });
});
Using the Tokenizer:

javascript
Copy code
use.loadTokenizer().then(tokenizer => {
  tokenizer.encode('Hello, how are you?'); // Outputs token indices
});
To specify a different vocabulary path:

javascript
Copy code
use.loadTokenizer('https://storage.googleapis.com/learnjs-data/bert_vocab/vocab.json').then(tokenizer => {
  tokenizer.encode('Hello, how are you?'); // Outputs token indices
});
For QnA Applications:

javascript
Copy code
// Load the QnA model
use.loadQnA().then(model => {
  // Embed questions and responses
  const input = {
    queries: ['How are you feeling today?', 'What is the capital of China?'],
    responses: [
      { response: 'I\'m not feeling very well.' },
      { response: 'Beijing is the capital of China.' },
      { response: 'You have five fingers on your hand.' }
    ]
  };
  const embeddings = model.embed(input);
  const scores = tf.matMul(embeddings.queryEmbedding, embeddings.responseEmbedding, false, true).dataSync();
  // Use `scores` to determine the best responses
});
For additional examples and usage tips, visit our GitHub repository.






