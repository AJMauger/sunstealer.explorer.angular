import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StateStatus } from '../ngrx/status';
import { AppState } from '../app.component';

export interface Props {
  height?: string;
  width?: string;
};

@Component({
  selector: 'status',
  template: `
    <div style="backgroundColor: var(--color-background-modal); borderRadius: 8px; height: {this.props.height}; overflow: hidden; padding: 5px; margin: 8px; width: {this.props.width}">
    <div style="color: gray;">Status functional component</div>
      <div style="color: var(--red); padding: 5px;">{{this.stateStatus.error}}</div>
      <div style="color: var(--yellow); padding: 5px;">{{this.stateStatus.warning}}</div>
    </div>`,
  styles: [
  ]
})
export class StatusComponent {
  public status!: Observable<StateStatus>;
  public stateStatus!: StateStatus;
  public JSON = JSON;

  constructor(private store: Store<AppState>) {
    this.status = this.store.select(state => state.status); //ajm: ngrx selector
    this.status.subscribe((value: StateStatus) => { this.stateStatus = value} );
  }
}
