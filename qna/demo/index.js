/**

 * =============================================================================
 */

import * as qna from "@lightweight-models/qna";
import "@aresobus/lightweight-models-core";
import "@aresobus/lightweight-models-backend-cpu";
import "@aresobus/lightweight-models-backend-webgl";

let modelPromise = {};
let search;
let input;
let contextDiv;
let answerDiv;

const process = async () => {
  const model = await modelPromise;
  const answers = await model.findAnswers(input.value, contextDiv.value);
  console.log(answers);
  answerDiv.innerHTML = answers
    .map((answer) => answer.text + " (score =" + answer.score + ")")
    .join("<br>");
};

window.onload = () => {
  modelPromise = qna.load();
  input = document.getElementById("question");
  search = document.getElementById("search");
  contextDiv = document.getElementById("context");
  answerDiv = document.getElementById("answer");
  search.onclick = process;

  input.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
      process();
    }
  });
};
