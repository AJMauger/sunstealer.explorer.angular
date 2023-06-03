import { Component, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoggerService } from "../services/logger.service";
import { AppState } from '../app.component';
import { StateStatus } from '../ngrx/status';

@Component({
  changeDetection: ChangeDetectionStrategy.Default, // ajm: || .Push 
  selector: 'generic',
  template: `
       <div style="padding: 2vw; user-select: none; width: 90vw;">
        <div style="fontSize: 32">Generic Class Component</div>
        <hr />
        <div>
          <div class="label" style="color: gray; width: 200px;">ngrx store</div>
          <pre class="label" style="width: 500">{{this.JSON.stringify(this.stateStore, null, 2)}}</pre>
        </div>
        <hr />
        <div style="backgroundColor: var(--color-background-modal); borderRadius: 8px; margin: 8px;">
          <table style="margin: 8px; width: 90%;">
            <tbody>
              <tr>
                <td style="color: gray; width: 200px;">Error</td>
                <td>
                  <ajm-text help = "Error" placeholder = "placeholder" value="error" (OnInput) = "this.OnError($event)" />
                </td>
              </tr>
              <tr>
                <td style="color: gray; width: 200px;">Warning</td>
                <td>
                  <ajm-text help = "Warning" placeholder = "placeholder" value="warning" (OnInput) = "this.OnWarning($event)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      
        <status />

        <hr />

        <div>ng-container: simple condition
          <ng-container *ngIf="true"> <!-- ! => DOM, just if() -->
            <i style="color: var(--blue)">ng-container: *ngIf-true</i>
          </ng-container>
        </div>

        <hr />

        <div>ng-template: simple condition placeholder
          <div *ngIf="false else showNgTemplateContent"> 
            ng-template Content: *ngIf=false
          </div>
        </div>
        <ng-template #showNgTemplateContent>
          <i style="color: var(--blue)">ng-template Content: *ngIf=true</i>
        </ng-template>

        <hr />

      </div>`,
  styles: [
  ]
})
export class GenericComponent implements AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit {
  public state!: Observable<any>;
  public stateStore!: any;
  public JSON = JSON;

  public constructor(private store: Store<AppState>, public logger: LoggerService) {
    this.state = this.store.select(state => state);
    this.state.subscribe((value: StateStatus) => { this.stateStore = value} );
  }

  public OnError = (error: string) => {
    this.logger.LogDebug(`generic: OnError(${error})`);
    this.store.dispatch({ type: "statusError", error });
  }

  public OnWarning = (warning: string) => {
    this.logger.LogDebug(`generic: OnWarning(${warning})`);
    this.store.dispatch({ type: "statusWarning", warning });
  }

  ngAfterContentChecked() {
    this.logger.LogInformation("GenericComponent.AfterContentChecked()");
  }

  ngAfterContentInit() {
    this.logger.LogInformation("GenericComponent.AfterContentInit()");
  }

  ngAfterViewChecked() {
    this.logger.LogInformation("GenericComponent.AfterViewChecked()");
  } 

  ngAfterViewInit() {
    this.logger.LogInformation("GenericComponent.AfterViewInit()");
  } 

  ngDoCheck() {
    this.logger.LogInformation("GenericComponent.DoCheck()");
  } 

  ngOnChanges() {
    this.logger.LogInformation("GenericComponent.OnChnages()");
  } 
  
  ngOnDestroy() {
    this.logger.LogInformation("GenericComponent.OnDestrroy()");
  } 

  ngOnInit() {
    this.logger.LogInformation("GenericComponent.OnInit()");
  }
}
