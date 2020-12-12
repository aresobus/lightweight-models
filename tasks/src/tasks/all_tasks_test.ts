import { TaskModelLoader } from "../task_model";
import { modelIndex } from "./all_tasks";
import { Runtime, Task } from "./common";

describe("model index", () => {
  it("should index models at the right places", () => {
    // Iterate through all model loders and check that their runtime and tasks
    // match the location.
    for (const task of Object.keys(modelIndex)) {
      // tslint:disable-next-line:no-any
      const models = (modelIndex as any)[task];
      for (const modelName of Object.keys(models)) {
        const runtimes = models[modelName];
        for (const runtime of Object.keys(runtimes)) {
          const modelLoader = runtimes[runtime] as TaskModelLoader<{}, {}, {}>;
          // Check runtime.
          expect(modelLoader.metadata.runtime).toEqual(runtime as Runtime);
          // Check task label.
          expect(
            modelLoader.metadata.supportedTasks.includes(task as Task)
          ).toBe(true);
        }
      }
    }
  });
});
