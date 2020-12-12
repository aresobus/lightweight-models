import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { UrlParamKey } from "src/app/common/types";
import { ModelItem } from "src/app/models/model_item";
import {
  selectAllModelItems,
  selectSelectedModelItemId,
} from "src/app/store/selectors";
import { AppState } from "src/app/store/state";

/**
 * The tree to show all models grouped by tasks.
 */
@Component({
  selector: "navigation-tree",
  templateUrl: "./navigation_tree.component.html",
  styleUrls: ["./navigation_tree.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTree {
  items$ = this.store.pipe(select(selectAllModelItems));
  selectedItemId$ = this.store.pipe(select(selectSelectedModelItemId));

  constructor(
    private store: Store<AppState>,
    private readonly router: Router
  ) {}

  handleClick(item: ModelItem) {
    this.router.navigate([], {
      queryParams: {
        [UrlParamKey.MODEL_ITEM_ID]: item.id,
      },
      queryParamsHandling: "merge",
    });
  }
}
