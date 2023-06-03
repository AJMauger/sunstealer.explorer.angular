import { Component } from "@angular/core";
import * as jsonwebtoken from "jsonwebtoken";

import { ConfigurationService } from "../services/configuration.service"; 
import { IdentityService } from "../services/identity.service"; 
import { LoggerService } from "../services/logger.service"; 

@Component({
  selector: "authorization",
  template: `<div style="height: calc(100vh - 36px); overflow-y: auto; width: 100vw;">
    <table cell-padding={2} style="width: 99vw;">
      <thead>
        <tr style="height: 32px;">
          <th style="width: 100px;">Key</th>
          <th style="width: 1000px;">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="vertical-align: top;">access_token</td><td>{{this.identity.accessToken?.length === 43 ? this.identity.accessToken : JSON.stringify(this.jsonwebtoken.decode(this.identity.accessToken || "", { complete: true }) || {}, null, 2)}}</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">identity_token</td><td>{{JSON.stringify(this.jsonwebtoken.decode(this.identity.identityToken || "", { complete: true }) || {}, null, 2)}}</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">refresh_token</td><td>{{this.identity.refreshToken}}</td>
        </tr>
        <tr>
          <td style="vertical-align: top;">user</td><td>{{JSON.stringify(this.identity.userInfo, null, 2)}}</td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: []
})

export class AuthorizationComponent {
  public constructor(public configuration: ConfigurationService, public identity: IdentityService, public logger: LoggerService) {}

  public JSON = JSON;
  public jsonwebtoken = jsonwebtoken;
}
