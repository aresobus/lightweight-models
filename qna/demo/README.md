Here's a cleaned-up and streamlined version of the README section describing how to set up and run the QnA demo:

---

## QnA Demo

Experience the functionality of the Question and Answer model with our interactive demo. This demo allows you to input your own text and question to see how the model identifies and extracts answers.

### How to Use the Demo

1. **Update the Context**: Enter or paste the text from which you want to extract answers into the provided text area.
2. **Ask a Question**: Type your question into the input box.
3. **Get Answers**: Click the search button to process your input, and the answers will be displayed in the "Answers" section below.

### Setup and Run the Demo Locally

Follow these steps to get the demo running on your local machine:

1. **Navigate to the Demo Directory**:
   ```sh
   cd qna/demo
   ```

2. **Install Dependencies**:
   ```sh
   yarn
   ```

3. **Build Linked Dependencies**:
   ```sh
   yarn build-deps
   ```

4. **Launch the Development Server**:
   ```sh
   yarn watch
   ```
   This command compiles the application, watches for any file changes, and automatically opens the demo in your default web browser.

The demo provides a hands-on way to see how the pre-trained model performs with real-world data and queries. Adjust the context and questions as needed to test different scenarios or explore the model's capabilities.
