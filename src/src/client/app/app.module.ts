import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { statusReducer } from "./ngrx/status";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AuthorizationComponent } from "./components/authorization.component";
import { DialogComponent } from "./components/dialog.component";
import { FormComponent } from "./components/form.component";
import { GenericComponent } from "./components/generic.component";
import { GlobalHeaderComponent } from "./components/global-header.component";
import { HomeComponent } from "./components/home.component";
import { InterceptInterceptor } from "./intercept.interceptor";
import { MaterialComponent } from "./material/material.component";
import { MenuComponent } from "./components/menu.component";
import { NotificationComponent } from "./components/notification.component";
import { StatusComponent } from "./components/status.component";
import { TableComponent /* ajm: , TableCellComponent, TableHeaderComponent, TableRowComponent*/ } from "./components/table.component";
import { TextComponent } from "./components/text.component";

import { ConfigurationService } from "./services/configuration.service"; 
import { DialogService } from "./services/dialog.service"; 
import { IdentityService } from "./services/identity.service";
import { LoggerService } from "./services/logger.service";

import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from "@angular/material/core"
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRippleModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";

@NgModule({
  // ajm: my classes
  declarations: [ AppComponent, AuthorizationComponent, DialogComponent, FormComponent, GenericComponent, GlobalHeaderComponent, HomeComponent, MaterialComponent, MenuComponent, NotificationComponent, StatusComponent, TableComponent, /* ajm: TableCellComponent, TableHeaderComponent, TableRowComponent,*/ TextComponent ],

  // ajm: libraries
  imports: [ AppRoutingModule, BrowserModule, BrowserAnimationsModule, DragDropModule, FormsModule, HttpClientModule, ReactiveFormsModule,

    // ajm: store
    StoreModule.forRoot({ status: statusReducer }),
  
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatIconModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule,
  
    MatNativeDateModule, MatMomentDateModule,
  ],

  // ajm: my services.
  // ajm: type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[];
  // ajm: provider class => instaniate => { multi: false, provide: Logger, useClass: Logger }
  providers: [ ConfigurationService, DialogService, IdentityService, { provide: LoggerService, useClass: LoggerService }, // ajm: ngModule.providers => singleton
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptInterceptor,
      multi: true
    }*/
  ],

  schemas: [NO_ERRORS_SCHEMA],

  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(public configuration: ConfigurationService, public dialog: DialogService, public identity: IdentityService, public logger: LoggerService) {
    configuration.Initialize(identity, logger);
    identity.Initialize(configuration, dialog, logger);
    logger.Initialize(configuration, identity);
  }
}