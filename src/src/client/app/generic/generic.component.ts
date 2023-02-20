import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoggerService } from "../logger.service";
import { AppState } from '../app.component';
import { StateStatus } from '../ngrx/status';

@Component({
  selector: 'generic',
  template: `
       <div style="padding: 2vw; user-select: none; width: 90vw;">
        <div style="fontSize: 32">Generic Component</div>
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
        <hr />
        <status />
      </div>`,

  styles: [
  ]
})
export class GenericComponent {
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
}
