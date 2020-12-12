import { createAction, props } from "@ngrx/store";

import { ModelItem } from "../models/model_item";

/** Adds ModelItems at app init time. */
export const addModelItemsFromInit = createAction(
  "[Init] Add Model Item",
  props<{ items: ModelItem[] }>()
);

/** Sets the currently selected model item. */
export const setSelectedModelItem = createAction(
  "[Navigator] Set Selected Model Item",
  props<{ itemId: string }>()
);
