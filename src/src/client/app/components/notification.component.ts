import { Component, Input } from '@angular/core';
import { Event } from "../services/event"

@Component({
  selector: 'notification',
  template: `<div style="align-items: center; background: var(--color-background-div); border-radius: 10px; display: flex; flex-direction: row; margin: 10px; padding: 20px; width: calc(100% - 60px);">
  <div class={{this.Icon(this.event.severity)}} style="height: 45px; width: 45px;"></div>
  <div style="marginLeft: 20px; margin-right: 20px; width: calc(100% - 10px);">{{this.event.message}}</div>
  <div style="display: flex; flex-direction: column;">
    <div style="height: 50%; text-align: right;">{{this.event.time}}</div>
    <div class="active icon-check-circle" style="background-position-x: 26px; height: 28px; margin-top: 10px;" (click)="this.Acknowledge($event)"></div>
  </div>
</div>`,
  styles: []
})
export class NotificationComponent {
  @Input() event!: Event;

  public Acknowledge = (e: any) => {
    e.target.parentElement.parentElement.style.display = "none";
  }

  public Icon = (severity: number): string => {
    let icon: string = "icon-info";
    switch (severity) {
      case 2:
        icon = "icon-warn";
        break;
      case 3:
      case 4:
        icon = "icon-error";
        break;
    }
    return icon;
  }
}
