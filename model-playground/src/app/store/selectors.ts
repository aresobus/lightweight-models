import { getSelectors, RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UrlParamKey } from "../common/types";

import { AppState } from "./state";

const selectRouter = createFeatureSelector<RouterReducerState>("router");
const selectQueryParams = getSelectors(selectRouter).selectQueryParams;

/** Selector to select all model items. */
export const selectAllModelItems = (state: AppState) => {
  return state.allModelItems;
};

/** Selector to select the id of the currently selected model item from URL. */
export const selectSelectedModelItemId = createSelector(
  selectQueryParams,
  (params) => {
    if (!params) {
      return "";
    }
    return params[UrlParamKey.MODEL_ITEM_ID];
  }
);
