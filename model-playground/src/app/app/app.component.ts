import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { NgrxMediaQueriesFacade } from "@yoozly/ngrx-mediaqueries";

import { ModelItemService } from "../services/model_item_service";
import { selectSelectedModelItemId } from "../store/selectors";
import { AppState } from "../store/state";

/** The main app component. */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isSmallScreen$ = this.mqServide.getMediaQueryState("small-screen");
  selectedItemId$ = this.store.pipe(select(selectSelectedModelItemId));

  constructor(
    private readonly store: Store<AppState>,
    private readonly modelItemService: ModelItemService,
    private readonly mqServide: NgrxMediaQueriesFacade
  ) {
    this.modelItemService.registerAllModelItems();
  }
}
