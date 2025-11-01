import { Component, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, Injectable, OnChanges, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { RouterOutlet } from "@angular/router";

import { GlobalHeaderComponent } from "./components/global-header.component";
import { ConfigurationService } from "./services/configuration.service"; 
import { DialogService } from "./services/dialog.service"; 
import { eOIDCFLOW, IdentityService } from "./services/identity.service"; 
import { LoggerService } from "./services/logger.service"; 

import { StateStatus } from "./ngrx/status";

// ajm: state
export interface AppState {
  readonly status: StateStatus;
}

@Component({
  imports: [GlobalHeaderComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: "app-root",
  template: `
    <div>
      <global-header />
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})

export class AppComponent /* ajm: implements AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit*/ {
  public globalHeaderComponent!: GlobalHeaderComponent;

  public constructor(public configuration: ConfigurationService, public dialog: DialogService, public identity: IdentityService, public logger: LoggerService) {
    logger.LogDebug(`document.location:  ${JSON.stringify(document.location)}`);
    logger.LogDebug(`sessionStorage:  ${JSON.stringify(sessionStorage)}`);
  
    this.globalHeaderComponent = new GlobalHeaderComponent(configuration, dialog, identity, logger);
      const url: URL = new URL(window.location.href);
      this.identity.code = url.searchParams.get("code");
      if(this.identity.code) {
        this.identity.AuthorizationCodeFlowPKCE();
      }
  }

  /* ngAfterContentChecked() {
    this.logger.LogInformation("AppComponent.AfterComponentChecked()");
  }

  ngAfterContentInit() {
    this.logger.LogInformation("AppComponent.AfterContentInit()");
  }

  ngAfterViewChecked() {
    this.logger.LogInformation("AppComponent.AfterViewChecked()");
  } 

  ngAfterViewInit() {
    this.logger.LogInformation("AppComponent.AfterViewInit()");
  } 

  ngDoCheck() {
    this.logger.LogInformation("AppComponent.DoCheck()");
  } 

  ngOnChanges() {
    this.logger.LogInformation("AppComponent.OnChnages()");
  } 
  
  ngOnDestroy() {
    this.logger.LogInformation("AppComponent.OnDestrroy()");
  } 

  ngOnInit() {
    this.logger.LogInformation("AppComponent.OnInit()");
  }*/
}
