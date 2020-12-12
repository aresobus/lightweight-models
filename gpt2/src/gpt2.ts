/**

 * =============================================================================
 */

export class GPT2 {
  // @pforderique feel free to change the API
  // This api should be friendly to JS users.
  async generate(input: string): Promise<string> {
    // Fake delay for where the model will run.
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    console.log(`got input '${input}'`);
    return " the park";
  }
}
