import { NgModule } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { statusReducer } from "./ngrx/status";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { DialogComponent } from './dialog/dialog.component';
import { GlobalHeaderComponent } from "./global-header/global-header.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";

import { ConfigurationService } from "./configuration.service"; 
import { IdentityService } from "./identity.service";
import { LoggerService } from "./logger.service";
import { NotificationComponent } from './notification/notification.component';

import { GenericComponent } from './generic/generic.component';
import { TextComponent } from './text/text.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [ AppComponent, AuthorizationComponent, DialogComponent, GlobalHeaderComponent, HomeComponent, MenuComponent, NotificationComponent, TextComponent, GenericComponent, StatusComponent ],
  imports: [ AppRoutingModule, BrowserModule, HttpClientModule, 

    // ajm: store
    StoreModule.forRoot({ status: statusReducer })
  
  ],
  providers: [ ConfigurationService, IdentityService, LoggerService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(public configuration: ConfigurationService, public identity: IdentityService, public logger: LoggerService) {
    configuration.Initialize(identity, logger);
    identity.Initialize(configuration, logger);
    logger.Initialize(configuration, identity);
  }
}