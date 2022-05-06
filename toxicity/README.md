Toxicity Classifier
The Toxicity Classifier uses the Universal Sentence Encoder (Cer et al., 2018) to identify toxic content within text, such as threats, insults, obscenities, identity-based hate, or sexually explicit language. It has been trained on the Civil Comments dataset, which consists of approximately 2 million comments labeled for various forms of toxicity (dataset link).

For a deeper understanding of how the toxicity labels were defined and calibrated, please refer to this detailed description.

Explore our online demo where you can see the model's predictions on sample sentences or input your own text for analysis.

Demo Screenshot

Installation
Using Yarn:

yarn add @tensorflow/tfjs @tensorflow-models/toxicity
Using npm:

npm install @tensorflow/tfjs @tensorflow-models/toxicity
Usage
In Node.js:

require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
In a Browser:

Copy code
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity"></script>
Example:

// Define the minimum prediction confidence threshold.
const threshold = 0.9;

// Load the model with optional parameters such as threshold and labels.
toxicity.load(threshold).then(model => {
  // Sample sentences for classification.
  const sentences = ['you suck'];

  // Classify sentences and handle predictions.
  model.classify(sentences).then(predictions => {
    // `predictions` is an array of objects for each type of toxicity label,
    // containing probabilities and a boolean flag `match` indicating a positive classification.
    console.log(predictions);
    /*
    Example output:
    [
      {
        "label": "identity_attack",
        "results": [{
          "probabilities": [0.9659664034843445, 0.03403361141681671],
          "match": false
        }]
      },
      {
        "label": "insult",
        "results": [{
          "probabilities": [0.08124706149101257, 0.9187529683113098],
          "match": true
        }]
      },
      ...
    ]
     */
  });
});
For more examples and detailed usage instructions, please visit our GitHub repository.






