import { Action, createReducer, on } from "@ngrx/store";

import { ModelItem } from "../models/model_item";

import * as Actions from "./actions";
import { initialState } from "./state";

/** Reducer for `allModelItems`. */
export function allModelItemsReducer(
  state: ModelItem[] | undefined = initialState.allModelItems,
  action: Action
) {
  return createReducer(
    initialState.allModelItems,

    on(Actions.addModelItemsFromInit, (state, { items }) => [
      ...state,
      ...items,
    ])
  )(state, action);
}
