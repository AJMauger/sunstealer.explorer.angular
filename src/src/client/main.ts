import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideAppInitializer, inject } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, Routes } from "@angular/router";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

import { AuthorizationComponent } from "./app/components/authorization.component";
import { FormComponent } from "./app/components/form.component";
import { GenericComponent } from "./app/components/generic.component";
import { GuardGuard } from "./app/guard.guard";
import { HomeComponent } from "./app/components/home.component";
import { LazyComponent } from "./app/components/lazy.component";
import { MaterialComponent } from "./app/material/material.component";
import { TableComponent } from "./app/components/table.component";
import { ConfigurationService } from "./app/services/configuration.service";
import { DialogService } from "./app/services/dialog.service";
import { IdentityService } from "./app/services/identity.service";
import { LoggerService } from "./app/services/logger.service";
import { LocationChangeListener } from "@angular/common";

const LAZY_ROUTES: Routes = [
  { path: '', component: LazyComponent }
];

export const routes: Routes = [
  { path: "authorization", component: AuthorizationComponent /*, canActivate: [GuardGuard]*/ },
  { path: "form", component: FormComponent },
  { path: "generic", component: GenericComponent },
  { path: "home", component: HomeComponent },
  { path: "material", component: MaterialComponent },
  { path: "oidc", component: HomeComponent },
  { path: "table", component: TableComponent },
  { path: 'lazy', loadChildren: () => LAZY_ROUTES }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    ConfigurationService,
    IdentityService,
    LoggerService,
    DialogService,
    provideAppInitializer(() => {
      const configuration: ConfigurationService = inject(ConfigurationService);
      const logger: LoggerService = inject(LoggerService);
      const identity: IdentityService = inject(IdentityService);
      const dialog: DialogService = inject(DialogService);

      configuration.Initialize(identity, logger);
      logger.Initialize(configuration, identity);
      identity.Initialize(configuration, dialog, logger);
  })
  ]
}).catch(e => console.error(e));
