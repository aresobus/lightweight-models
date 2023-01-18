import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs-core";
import { interpolateReds } from "d3-scale-chromatic";

const sentences = [
  "I like my phone.",
  "Your cellphone looks great.",
  "How old are you?",
  "What is your age?",
  "An apple a day, keeps the doctors away.",
  "Eating strawberries is healthy.",
];

const init = async () => {
  const model = await use.load();
  document.querySelector("#loading").style.display = "none";
  renderSentences();

  const embeddings = await model.embed(sentences);
  const matrixSize = 250;
  const cellSize = matrixSize / sentences.length;
  const canvas = document.querySelector("canvas");
  canvas.width = matrixSize;
  canvas.height = matrixSize;

  const ctx = canvas.getContext("2d");

  const xLabelsContainer = document.querySelector(".x-axis");
  const yLabelsContainer = document.querySelector(".y-axis");

  for (let i = 0; i < sentences.length; i++) {
    const labelXDom = document.createElement("div");
    const labelYDom = document.createElement("div");

    labelXDom.textContent = i + 1;
    labelYDom.textContent = i + 1;
    labelXDom.style.left = i * cellSize + cellSize / 2 + "px";
    labelYDom.style.top = i * cellSize + cellSize / 2 + "px";

    xLabelsContainer.appendChild(labelXDom);
    yLabelsContainer.appendChild(labelYDom);

    for (let j = i; j < sentences.length; j++) {
      const sentenceI = tf.slice(embeddings, [i, 0], [1]);
      const sentenceJ = tf.slice(embeddings, [j, 0], [1]);
      const sentenceITranspose = false;
      const sentenceJTransepose = true;
      const score = tf
        .matMul(sentenceI, sentenceJ, sentenceITranspose, sentenceJTransepose)
        .dataSync();

      ctx.fillStyle = interpolateReds(score);
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
};
const initQnA = async () => {
  const input = {
    queries: ["How are you feeling today?"],
    responses: [
      "I'm not feeling very well.",
      "Beijing is the capital of China.",
      "You have five fingers on your hand.",
    ],
  };
  const model = await use.loadQnA();
  document.querySelector("#loadingQnA").style.display = "none";
  let result = model.embed(input);
  const dp = tf
    .matMul(result["queryEmbedding"], result["responseEmbedding"], false, true)
    .dataSync();
  for (let i = 0; i < dp.length; i++) {
    document.getElementById(`answer_${i + 1}`).textContent = `${dp[i]}`;
  }
};
init();
initQnA();

const renderSentences = () => {
  sentences.forEach((sentence, i) => {
    const sentenceDom = document.createElement("div");
    sentenceDom.textContent = `${i + 1}) ${sentence}`;
    document.querySelector("#sentences-container").appendChild(sentenceDom);
  });
};
