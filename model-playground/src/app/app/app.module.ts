// This is needed to make media queries work in Angular zone.
import "zone.js/dist/webapis-media-query";

import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  MediaQueriesService,
  MERGE_REDUCERS,
  NgrxMediaqueriesModule,
  ngrxMediaQueriesReducer,
} from "@yoozly/ngrx-mediaqueries";

import { NavigationTreeModule } from "../components/navigation_tree/navigation_tree.module";
import { appReducers } from "../store/state";

import { AppComponent } from "./app.component";

/** The main application module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NavigationTreeModule,
    NgrxMediaqueriesModule.forRoot({
      // Detect if the app is running on a small screen/area for responsive
      // design purposes. UI elements will be arranged differently on screens
      // with different sizes.
      //
      // TODO: add more (e.g. medium-screen, etc) as needed.
      "small-screen": "screen and (max-width:600px)",
    }),
    StoreModule.forRoot(MERGE_REDUCERS),
    RouterModule.forRoot([
      { path: "", component: AppComponent },
      { path: "**", redirectTo: "" },
    ]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: MERGE_REDUCERS,
      useFactory: (): ActionReducerMap<{}> => ({
        ...appReducers,
        router: routerReducer,
        ...ngrxMediaQueriesReducer(),
      }),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (init: MediaQueriesService) => () => init,
      deps: [MediaQueriesService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * The DevAppModule adds the NgRx dev tools support when running in dev
 * mode.
 *
 * Download the chrome extension that works with internal sites at:
 * go/redux-devtools
 */
@NgModule({
  imports: [
    AppModule,
    StoreDevtoolsModule.instrument({
      maxAge: 200, // Retains last 200 states
      autoPause: true, // Pauses recording actions and state changes when the
      // extension window is not open
    }),
  ],
  bootstrap: [AppComponent],
})
export class DevAppModule {}
