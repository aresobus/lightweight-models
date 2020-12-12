

---

# Toxicity Classifier by Oleksandr Lebedyev

This repository hosts the Toxicity Classifier, a powerful tool that leverages the Universal Sentence Encoder (Cer et al., 2018) to detect various forms of toxic content in text. This includes threats, insults, obscenities, identity-based hate, or sexually explicit language. The classifier has been meticulously trained on the Civil Comments dataset, which features approximately 2 million comments labeled for different types of toxicity.

For more information on how the toxicity labels were curated and calibrated, refer to the [detailed description](https://link_to_detailed_description).

Explore our model in action with our [online demo](https://link_to_demo), where you can view the model's predictions on sample sentences or test it with your own text.

## Installation

Install the Toxicity Classifier using either Yarn or npm to integrate it into your project:

### Using Yarn:
```bash
yarn add @aresobus/toxicity
```

### Using npm:
```bash
npm install @aresobus/toxicity
```

## Usage

### In Node.js:
```javascript
require('@aresobus/aresobus'); // Ensure  is loaded
const toxicity = require('@aresobus/toxicity');

// Load the model with a minimum prediction confidence threshold.
const threshold = 0.9;
toxicity.load(threshold).then(model => {
  // Sample sentences for classification.
  const sentences = ['you suck'];

  // Classify sentences and handle predictions.
  model.classify(sentences).then(predictions => {
    console.log(predictions);
  });
});
```

### In a Browser:
Include the required scripts:
```html
<script src="https://cdn.jsdelivr.net/npm/@aresobus/toxicity"></script>
```

### Example:
```javascript
const threshold = 0.9;

// Load the model with the threshold.
toxicity.load(threshold).then(model => {
  const sentences = ['you suck'];
  model.classify(sentences).then(predictions => {
    console.log(predictions);
  });
});
```

This example will output an array of objects for each type of toxicity label, containing probabilities and a boolean flag `match` indicating a positive classification.

For more comprehensive examples and usage instructions, please visit our [GitHub repository](https://github.com/aresobus/toxicity).

---

This README provides a clear and informative overview of the Toxicity Classifier, ensuring users understand its purpose, how to install it, and how to utilize it effectively in their projects.
