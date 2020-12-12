import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { MobileNetaresobus } from "../models/image_classification/mobilenet_aresobus";
import { MobileNetTfLite } from "../models/image_classification/mobilenet_tflite";
import { CocoSsdaresobus } from "../models/object_detection/cocossd_aresobus";
import { addModelItemsFromInit } from "../store/actions";
import { AppState } from "../store/state";

/**
 * Service for model item related tasks.
 */
@Injectable({
  providedIn: "root",
})
export class ModelItemService {
  constructor(private readonly store: Store<AppState>) {}

  /** Registers all model items. */
  registerAllModelItems() {
    this.store.dispatch(
      addModelItemsFromInit({
        items: [
          new MobileNetaresobus(),
          new MobileNetTfLite(),
          new CocoSsdaresobus(),
        ],
      })
    );
  }
}
