import { Component } from "@angular/core";
import { ConfigurationService } from "../services/configuration.service"; 
import { DialogService } from "../services/dialog.service"; 
import { IdentityService } from "../services/identity.service"; 
import { LoggerService } from "../services/logger.service"; 

@Component({
  selector: "home",
  template: `<pre style="height: calc(100vh - 36px); overflowY: auto;">
      {{ this.identity.discovery ? JSON.stringify(this.identity.discovery, null, 2) : "" }}
    </pre>`,
  styles: []
})

export class HomeComponent {
   public JSON = JSON;

  public constructor(public configuration: ConfigurationService, public dialogService: DialogService, public identity: IdentityService, public logger: LoggerService) {
    if (!logger.configuration) {
      logger.LogError("Initialization");
    }
  }
}
