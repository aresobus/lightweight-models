import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule, DevAppModule } from "./app/app/app.module";
import { environment } from "./environments/environment";

// Load AppModule in productio mode.
if (environment.production) {
  enableProdMode();
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}
// Load DevAppModule in dev mode.
//
// DevAppModule has extra modules (e.g. StoreDevtoolsModule) registered for
// debugging purpose.
else {
  platformBrowserDynamic()
    .bootstrapModule(DevAppModule)
    .catch((err) => console.error(err));
}
