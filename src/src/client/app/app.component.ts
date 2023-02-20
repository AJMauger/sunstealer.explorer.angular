import { Component } from "@angular/core";
import { GlobalHeaderComponent } from "./global-header/global-header.component";

import { ConfigurationService } from "./configuration.service"; 
import { eOIDCFLOW, IdentityService } from "./identity.service"; 
import { LoggerService } from "./logger.service"; 
import { StateStatus } from "./ngrx/status";

// ajm: state
export interface AppState {
  readonly status: StateStatus;
}

@Component({
  selector: "app-root",
  template: `
    <div>
      <global-header />
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})

export class AppComponent {
  public globalHeaderComponent!: GlobalHeaderComponent;

  public constructor(public configuration: ConfigurationService, public identity: IdentityService, public logger: LoggerService) {
    this.globalHeaderComponent = new GlobalHeaderComponent(configuration, identity, logger);

    if (this.identity.GetState() === eOIDCFLOW.eSIGNINGIN) {
      this.identity.AuthorizationCodeFlowPKCE();
    }
  }
}
