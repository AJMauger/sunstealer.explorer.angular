import { Component, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoggerService } from "../services/logger.service";
import { AppState } from '../app.component';
import { StatusComponent } from './status.component'
import { StateStatus } from '../ngrx/status';

@Component({
  changeDetection: ChangeDetectionStrategy.Default, // ajm: || .Push 
  imports: [StatusComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
           @if (true) {
             <i style="color: var(--blue)">ng-container: if-true</i>
           }
         </div>
       
         <hr />
       
         <div>ng-template: simple condition placeholder
           @if (false) {
             <div>
               ng-template Content: if=false
             </div>
           } @else {
             <i style="color: var(--blue)">ng-template Content: if=true</i>
           }
         </div>
       
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

  public OnError = (event: Event) => {
    const error: string = (event.target as HTMLInputElement).value
    this.logger.LogDebug(`generic: OnError(${error})`);
    this.store.dispatch({ type: "statusError", error });
  }

  public OnWarning = (event: Event) => {
    const warning: string = (event.target as HTMLInputElement).value
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
