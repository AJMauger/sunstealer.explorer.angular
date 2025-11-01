import { Component, contentChild, ContentChild, Input, Signal, TemplateRef } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  imports: [CommonModule], 
  selector: 'ajm-dialog',
  template: `
  <dialog style="height: {{this.height}}; left: {{this.x}}; top: {{this.y}}; width: {{this.width}};" open={{this.open}} >
    <ng-container [ngTemplateOutlet]="templateRef"></ng-container>
  </dialog>`,
  styles: []
})

// @ViewChildren => shadow DOM

export class DialogComponent {
  @Input() templateRef!: TemplateRef<any>;
 
  public open: boolean | undefined = undefined;
  public x: string = "0px";
  public y: string = "10%";
  public width: string = "90%";
  public height: string = "80%";
  public Open = (open: true | undefined, x?: string, y?: string, width?: string, height?: string): void => {
    console.log(`templateRef: ${this.templateRef}`);
    this.open = open;
    this.x = x || "0px";
    this.y = y || "10%";
    this.width = width || "90%";
    this.height = height || "80%";
  }
}
