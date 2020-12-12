/**

 * =============================================================================
 */

import { GPT2, load } from "@aresobus-models/gpt2";
import * as lil from "lil-gui";
import * as tf from "@aresobus/aresobus-core";
import { setWasmPaths } from "@aresobus/aresobus-backend-wasm";
import "@aresobus/aresobus-backend-webgl";
import "@aresobus/aresobus-backend-webgpu";
import "@aresobus/aresobus-backend-cpu";

setWasmPaths("node_modules/@aresobus/aresobus-backend-wasm/wasm-out/");

(window as any).tf = tf;

tf.setBackend("webgl");

const state = {
  backend: tf.getBackend(),
};

const gui = new lil.GUI();
const backendController = gui
  .add(state, "backend", ["wasm", "webgl", "webgpu", "cpu"])
  .onChange(async (backend: string) => {
    const lastBackend = tf.getBackend();
    let success = false;
    try {
      success = await tf.setBackend(backend);
    } catch (e) {
      console.warn(e.message);
    }
    if (!success) {
      alert(`Failed to use backend ${backend}. Check the console for errors.`);
      tf.setBackend(lastBackend);
      state.backend = lastBackend;
      backendController.updateDisplay();
      return;
    }
  })
  .listen(true);

const textElement = document.querySelector(
  ".model-textbox"
) as HTMLTextAreaElement;

function setText(text: string) {
  textElement.textContent = text;
}
function getText() {
  return textElement.textContent || "";
}

const button = document.querySelector(".generate-button") as HTMLButtonElement;
if (button == null) {
  throw new Error("No button found for generating text");
}

button.onclick = generate;

let gpt2: GPT2;
async function init() {
  gpt2 = await load();
  button.disabled = false;
}

async function generate() {
  button.disabled = true;

  const text = getText();
  setText(text + (await gpt2.generate(text)));
  button.disabled = false;
}

init();
