import { ActionReducerMap } from "@ngrx/store";

import { ModelItem } from "../models/model_item";

import { allModelItemsReducer } from "./reducers";

/** The main app state. */
export interface AppState {
  /** All registered ModelItem objects. */
  allModelItems: ModelItem[];
}

/** The initial app state. */
export const initialState: AppState = {
  allModelItems: [],
};

/** Reducers for each app state field. */
export const appReducers: ActionReducerMap<AppState> = {
  allModelItems: allModelItemsReducer,
};
