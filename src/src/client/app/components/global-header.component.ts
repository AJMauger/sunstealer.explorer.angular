import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, viewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DialogComponent } from "./dialog.component";
import { MenuComponent, MenuOption, MenuProps } from "./menu.component";
import { RouterLink } from '@angular/router';

import { ConfigurationService } from "../services/configuration.service"; 
import { DialogService } from "../services/dialog.service"; 
import { eOIDCFLOW, IdentityService } from "../services/identity.service"; 
import { LoggerService } from "../services/logger.service"; 

import { publishPushNotification } from "../services/clientpushnotifications" 
import { NotificationComponent } from "./notification.component";

@Component({
  imports: [CommonModule, DialogComponent, NotificationComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  selector: "global-header",
  template: `
    <div class="main-toolbar">
      <div style="align-items: center; display: flex; flex-direction: row; height: 100%; justify-content: center; padding-left: 20px">
        <div class="icon-menu main-toolbar-icon" (click)="this.menu=true;"></div>
        <div style="color: var(--yellow); padding: 10px">SUNSTEALER (OpenID Connect Relying Party)</div>
      </div>

      <div style="align-items: center; display: flex; flex-direction: row; height: 100%; justify-content: center; padding-right: 5px">
        <div class="icon-notifications-none main-toolbar-icon" style="padding-right: 20px;" (click)="this.OpenNotifications()"></div>
        <div style="margin-right: 5px">{{this.identity.userInfo?.name}}</div>
        <div class="icon-identity main-toolbar-icon" style="padding-right: 20px" (click)="this.OpenIdentity()"></div>
      </div>
    </div>
    
    
    <dialog style="border-radius: 0px; height: {{this.menuProps.height}}; left: {{this.menuProps.x}}; padding: 10px; top: {{this.menuProps.y}}; width: {{this.menuProps.width}}" open={{this.menu}} (click)="this.menu=undefined;">
      <div style="alignItems: center; display: flex; flex-direction: row; height: 24; justify-content: space-between;">
        <div>Menu</div>
        <div class="icon-close dialog-toolbar-icon" style="height: 18px; right: 10px; width: 18px;" (click)="this.menu=undefined"></div>
      </div>
      <hr />
      <div *ngFor="let io of this.menuProps.options">
        <ng-container [ngSwitch]="io.type">
          <hr *ngSwitchCase="'break'" />
          <div *ngSwitchCase="'callback'" class="menu-option" (click)="this.OnOption(io);">{{io.option}}</div>
          <div *ngSwitchCase="'router-link'" class="menu-option" routerLink="{{io.target}}">{{io.option}}</div>
          <!-- <div *ngSwitchDefault="'Error'" class="menu-option" >{{io.option}}</div> -->
        </ng-container>
      </div>
    </dialog>
    
    <ajm-dialog #dialogAbout [templateRef]="dialogAboutTemplate">
      <ng-template #dialogAboutTemplate>
        <div class="dialog-toolbar">
          <div>About</div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogAbout.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; height: calc(100% - 50px); justify-content: center; width: 100%;">
          <table style="width: 90%">
            <tbody>
              <tr><td style="width: 150px">Sunstealer Explorer</td><td>1.20.0</td></tr>
              <tr><td>Angular</td><td>20</td></tr>
              <tr><td></td><td>Adam Mauger</td></tr>
            </tbody>
          </table>
        </div>
      </ng-template>
    </ajm-dialog>

    <ajm-dialog #dialogConfiguration [templateRef]="dialogConfigurationTemplate">
      <ng-template #dialogConfigurationTemplate>
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
    
    <ajm-dialog #dialogIdentity [templateRef]="dialogIdentityTemplate">
      <ng-template #dialogIdentityTemplate>
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

    <ajm-dialog #dialogLog [templateRef]="dialogLogTemplate">
      <ng-template #dialogLogTemplate>
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
                <ng-container>
                  @if (e.severity >= this.configuration.configuration.log.level) {
                    <ng-container [ngSwitch]="e.severity">
                      <td style="verticalAlign: top; minWidth: 170px;">{{e.date}} - {{e.time}}</td>
                      <td *ngSwitchCase="0" style="color: gray; vertical-align: top; min-width: 70px;">[Db]</td>
                      <td *ngSwitchCase="1" style="color: var(--green); vertical-align: top; min-width: 70px;">[In]</td>
                      <td *ngSwitchCase="2" style="color: var(--yellow); vertical-align: top; min-width: 70px;">[Wn]</td>
                      <td *ngSwitchCase="3" style="color: var(--red); vertical-align: top; min-width: 70px;">[Er]</td>
                      <td *ngSwitchCase="4" style="color: var(--red); vertical-align: top; min-width: 70px;">[Ex]</td>
                      <td style="vertical-align: top">{{e.message}}</td>
                    </ng-container>
                  }
                </ng-container>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-template>
    </ajm-dialog>

    <ajm-dialog #dialogNotifications [templateRef]="dialogNotificationsTemplate">
      <ng-template #dialogNotificationsTemplate>
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
    </ajm-dialog>
    
    <ajm-dialog #dialogGeneric [templateRef]="dialogGenericTemplate">
      <ng-template #dialogGenericTemplate>
        <div class="dialog-toolbar">
          <div [innerHTML]="dialogTitle"></div>
          <div class="icon-close dialog-toolbar-icon" style="right: -5px" (click)="this.dialogGeneric.Open(undefined);"></div>
        </div>
        <div style="align-items: center; display: flex; flex-direction: column; height: calc(100% - 50px); justify-content: start; width: 100%;">
          <iframe srcdoc="{{this.dialogContent}}"></iframe>
        </div>
      </ng-template>
    </ajm-dialog>`,
  styles: []
})

export class GlobalHeaderComponent {
  @ViewChild("dialogGeneric") dialogGeneric!: DialogComponent; // ajm: bind <ajm-dialog #dialogGeneric> => dialogGeneric => 
  @ViewChild("dialogAbout") dialogAbout!: DialogComponent; 
  // public dialogAbout = viewChild<DialogComponent>("dialogAbout");
  @ViewChild("dialogConfiguration") dialogConfiguration!: DialogComponent; 
  @ViewChild("dialogIdentity") dialogIdentity!: DialogComponent;
  @ViewChild("dialogLog") dialogLog!: DialogComponent; 
  @ViewChild("dialogNotifications") dialogNotifications!: DialogComponent;

  // ajm: menu
  public menu: true | undefined = undefined;  // ajm: experimental, dialog menu
  public menuProps: MenuProps = {
    options: [
      { type: "router-link", target: "home", option: "Home" },
      { type: "router-link", target: "authorization", option: "Authorization" },
      { type: "router-link", target: "form", option: "Form" },
      // { type: "router-link", target: "generic", option: "Generic" },
      // { type: "router-link", target: "lazy/lazy", option: "Lazy" },
      // { type: "router-link", target: "table", option: "Table" },
      // { type: "break" },
      // { type: "router-link", target: "material", option: "Material" },
      { type: "break" },
      { type: "callback", target: "About", option: "About" },
      { type: "callback", target: "Configuration", option: "Configuration" },
      { type: "callback", target: "Log", option: "Log" },
      { type: "break" },
      { type: "callback", target: "Debug", option: "Debug" }
      // { type: "callback", target: "PushNotification", option: "Push notification"} 
    ],
    height: "290px",
    width: "215px",    
    x: "calc(-100% + 255px)",
    y: "15px",
  };

  public eOIDCFLOW = eOIDCFLOW;
  public JSON = JSON;

  public constructor(public configuration: ConfigurationService, public dialogService: DialogService, public identity: IdentityService, public logger: LoggerService) {
    if (!logger.configuration) {
      logger.LogError("Initialization");
    }
  }

  public AcknowledgeAll = () => {
    this.logger.notifications = [];
    this.dialogNotifications.Open(undefined);
  }

  public async OnOption (option: MenuOption): Promise<void> {
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
        // ajm: this.logger.LogInformation(`this.identity.CodeChallenge() = ${await this.identity.CodeChallenge()}`);
      break;
      case "Log":
        console.log(`logger.events.length: ${this.logger.events.length}`);
        this.dialogLog.Open(true);
      break;
      case "PushNotification":
        await publishPushNotification(this.configuration, this.logger);
      break;
    }
  }

  // ajm: dialogs
  public dialogContent!: string;
  public dialogTitle!: string; 

  public OpenDialog(content: string, title: string): void {
    this.dialogContent = content;
    this.dialogTitle = title;
    this.dialogGeneric.Open(true, "0px", "14%", "85%", "75%");
  }

  public OpenIdentity(): void {
    this.dialogIdentity.Open(true, "calc(100% - 400px)", "7%", "300px", "200px");
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
