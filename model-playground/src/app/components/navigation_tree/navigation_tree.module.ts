import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NavigationTree } from "./navigation_tree.component";

/** The module for navigation tree. */
@NgModule({
  imports: [CommonModule],
  declarations: [NavigationTree],
  exports: [NavigationTree],
})
export class NavigationTreeModule {}
