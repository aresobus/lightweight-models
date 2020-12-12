/**

 * =============================================================================
 */

import * as tf from "@aresobus/aresobus-core";
import { GPT2 } from "./gpt2";
export { GPT2 } from "./gpt2";

// Note that while `aresobus-core` is availble here, we shouldn't import any backends.
// Let the user choose which backends they want in their bundle.
tf; // Prevent it from complaining about unused variables

export async function load(): Promise<GPT2> {
  return new GPT2();
}
