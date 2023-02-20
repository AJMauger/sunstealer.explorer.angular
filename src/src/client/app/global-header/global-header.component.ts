import { Component, ViewChild } from "@angular/core";
import { DialogComponent } from "../dialog/dialog.component";
import { MenuComponent, MenuProps } from "../menu/menu.component";

import { ConfigurationService } from "../configuration.service"; 
import { eOIDCFLOW, IdentityService } from "../identity.service"; 
import { LoggerService } from "../logger.service"; 

@Component({
  selector: "global-header",
  template: `
    <div class="main-toolbar">
      <div style="align-items: center; display: flex; flex-direction: row; height: 100%; justify-content: center; padding-left: 20px">
        <div class="icon-menu main-toolbar-icon" (click)="this.OpenMenu();"></div>
        <div style="color: var(--yellow); padding: 10px">SUNSTEALER (OpenID Connect Relying Party)</div>
      </div>

      <div style="align-items: center; display: flex; flex-direction: row; height: 100%; justify-content: center; padding-right: 5px">
        <div class="icon-notifications-none main-toolbar-icon" style="padding-right: 20px;" (click)="this.OpenNotifications()"></div>
        <div style="margin-right: 5px">{{this.identity.userInfo?.name}}</div>
        <div class="icon-identity main-toolbar-icon" style="padding-right: 20px" (click)="this.OpenIdentity()"></div>
      </div>
    </div>
    
    <ajm-menu #menu [props] = this.options (OnOption) = "OnOption($event)">
    </ajm-menu>
    
    <ajm-dialog #dialogAbout>
      <ng-template>
        <div class="dialog-toolbar">
          <div>About</div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogAbout.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; height: calc(100% - 50px); justify-content: center; width: 100%;">
          <table style="width: 90%">
            <tbody>
              <tr><td style="width: 150px">Sunstealer Explorer</td><td>1.15.0</td></tr>
              <tr><td>Angular</td><td>15</td></tr>
              <tr><td></td><td>Adam Mauger</td></tr>
            </tbody>
          </table>
        </div>
      </ng-template>
    </ajm-dialog>
    
    <ajm-dialog #dialogConfiguration>
      <ng-template>
        <div class="dialog-toolbar">
          <div>Configuration</div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogConfiguration.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; flex-direction: column; height: calc(100% - 50px); justify-content: center; width: 100%;">
          <textarea #text style="background-color: var(--color-background-modal); border: none; color: whitesmoke; height: calc(100% - 120px); outline: none; width: 100%;" >{{this.JSON.stringify(this.configuration.configuration, null, 2)}}</textarea>
          <div style="align-items: flex-end; display: flex; height: 70px; justify-content: flex-end; padding-right: 10px; width: 100%;">
            <button (click)="this.Update(text.value);">Update</button>
          </div>
        </div>
      </ng-template>
    </ajm-dialog>
    
    <ajm-dialog #dialogIdentity>
      <ng-template>
        <div class="dialog-toolbar">
          <div>Identity</div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogIdentity.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; flex-direction: column; height: calc(100% - 50px); justify-content: center; width: 100%;">
        <div style="align-items: center; display: flex; flex-direction: row; height: 32px; padding-left: 10px; width: calc(100% - 15px);">
            <div style="color: gray; width: 50%;">User</div><div style="width: 50%;">{{this.identity.accessToken?.length === 43 ? this.identity.userInfo?.profile?.name : this.identity.userInfo?.payload?.profile?.name}}</div>
          </div>
          <div style="align-items: center; display: flex; flex-direction: row; height: 32px; padding-left: 10px; width: calc(100% - 15px);">
            <div style="color: gray; width: 50%;">Role</div><div style="width: 50%;">{{this.identity.accessToken?.length === 43 ? this.identity.userInfo?.profile?.role : this.identity.userInfo?.payload?.profile?.role}}</div>
          </div>
          <hr style="border: none; background-color: gray; height: 1px; margin-bottom: 10px; margin-top: 10px; width: 100%;" />
          <div class="menu-option" style="display: {{this.identity.GetState() === eOIDCFLOW.eSIGNEDIN ? 'none' : ''}}" (click)="this.SignIn();">Sign in</div>
          <div class="menu-option" style="display: {{this.identity.GetState() === eOIDCFLOW.eSIGNEDOUT ? 'none' : ''}}" (click)="this.SignOut()">Sign out</div>
        </div>
      </ng-template>
    </ajm-dialog>

    <ajm-dialog #dialogLog>
      <ng-template>
        <div class="dialog-toolbar">
          <div>Log ({{this.logger.events.length}})</div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogLog.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; height: calc(100% - 50px); justify-content: center; width: 100%;">
          <table style="display: block; height: calc(100% - 80px); user-select: text; width: 100%;">
            <thead style="align-items: center; display: flex; fontSize: 14px; height: 32px;">
              <tr><td style="min-width: 170px;">Time</td><td style="min-width: 70px;">Severity</td><td style="width: 870px">Message</td></tr>
            </thead>
            <tbody style="display: block; height: calc(100% - 32px); overflow-y: auto;">
            <tr *ngFor="let e of this.logger.events">
              <ng-container *ngIf="e.severity >= this.configuration.configuration.log.level">                
                <ng-container [ngSwitch]="e.severity">
                  <td style="verticalAlign: top; minWidth: 170px;">{{e.date}} - {{e.time}}</td>
                  <td *ngSwitchCase="0" style="color: gray; vertical-align: top; min-width: 70px;">[Db]</td>
                  <td *ngSwitchCase="1" style="color: var(--green); vertical-align: top; min-width: 70px;">[In]</td>
                  <td *ngSwitchCase="2" style="color: var(--yellow); vertical-align: top; min-width: 70px;">[Wn]</td>
                  <td *ngSwitchCase="3" style="color: var(--red); vertical-align: top; min-width: 70px;">[Er]</td>
                  <td *ngSwitchCase="4" style="color: var(--red); vertical-align: top; min-width: 70px;">[Ex]</td>
                  <td style="vertical-align: top">{{e.message}}</td>
                </ng-container>          
              </ng-container>          
            </tbody>
          </table>
        </div>
      </ng-template>
    </ajm-dialog>

    <ajm-dialog #dialogNotifications>
      <ng-template>
        <div class="dialog-toolbar">
          <button style="position: absolute; left: 10px; width: 150px;" (click)="this.AcknowledgeAll();">Acknowledge</button>
          <div>Notification</div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogNotifications.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; flex-direction: column; height: calc(100% - 50px); justify-content: start; width: 100%;">
          <ng-container *ngFor="let e of this.logger.notifications" >
            <notification style="width: 100%;" [event]=e></notification>
          </ng-container>
        </div>
      </ng-template>
    </ajm-dialog>`,
  styles: []
})

export class GlobalHeaderComponent {
  @ViewChild("dialogAbout") dialogAbout!: DialogComponent; 
  @ViewChild("dialogConfiguration") dialogConfiguration!: DialogComponent; 
  @ViewChild("dialogIdentity") dialogIdentity!: DialogComponent;
  @ViewChild("dialogLog") dialogLog!: DialogComponent; 
  @ViewChild("dialogNotifications") dialogNotifications!: DialogComponent;
  @ViewChild("menu") menu!: MenuComponent;

  public options: Array<MenuProps> = [
    { type: "router-link", target: "home", option: "Home" },
    { type: "router-link", target: "authorization", option: "Authorization" },
    { type: "break" },
    { type: "router-link", target: "generic", option: "Generic" },
    { type: "break" },
    { type: "callback", target: "About", option: "About" },
    { type: "callback", target: "Configuration", option: "Configuration" },
    { type: "callback", target: "Log", option: "Log" },
    { type: "break" },
    { type: "callback", target: "Debug", option: "Debug" },
    { type: "callback", target: "PushNotification", option: "Push notification" }
  ];

  public eOIDCFLOW = eOIDCFLOW;
  public JSON = JSON;

  public constructor(public configuration: ConfigurationService, public identity: IdentityService, public logger: LoggerService) {}

  public AcknowledgeAll = () => {
    this.logger.notifications = [];
    this.dialogNotifications.Open(undefined);
  }

  public OnOption(option: MenuProps): void {
    console.info(`menu option: ${option.target}`);
    switch(option.target) {
      case "About":
        this.dialogAbout.Open(true, "0px", "35%", "320px", "200px");
      break;
      case "Configuration":
        this.dialogConfiguration.Open(true, "0px", "14%", "85%", "75%");
      break;
      case "Debug":
        this.logger.LogDebug("LoggerService - debug test");
        this.logger.LogInformation("LogService - information test", "Information");
        this.logger.LogWarning("LogService - warning test");
        this.logger.LogError("LogService - error test");
        // ajm: this.Logger.LogException(new Error("LogService.ctor() - exception test"));
      break;
      case "Log":
        this.dialogLog.Open(true);
      break;
      case "PushNotification":
        // ajm: TODO
      break;
    }
  }

  public OpenIdentity(): void {
    this.dialogIdentity.Open(true, "calc(100% - 400px)", "7%", "300px", "200px");
  }

  public OpenMenu(): void {
    this.menu.Open(true);
  }

  public OpenNotifications(): void {
    this.dialogNotifications.Open(true, "calc(100% - 700px)", "7%", "600px", "calc(100% - 100px)");
  }

  public SignIn(): void {
    this.dialogIdentity.Open(undefined);
    this.identity.SetState(eOIDCFLOW.eSIGNINGIN);
    this.identity.AuthorizationCodeFlowPKCE();
  }

  public SignOut(): void {
    this.dialogIdentity.Open(undefined);
    this.identity.SignOut();
  }

  public Update = async (text: string) => {
    try {
      this.dialogConfiguration.Open(undefined);
      this.configuration.configuration = JSON.parse(text);
      await this.configuration.Save();
    } catch(e) {
      this.logger.LogException(e as Error);
    }
  }
}
