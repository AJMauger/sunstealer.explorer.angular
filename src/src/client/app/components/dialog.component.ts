import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ajm-dialog',
  template: `
  <dialog style="height: {{this.height}}; left: {{this.x}}; top: {{this.y}}; width: {{this.width}};" open={{this.open}} >
    <ng-container *ngTemplateOutlet="templateRef; context: { $implicit: 'implicit'}" #template1 select="[dialog]">
    </ng-container>
  </dialog>`,
  styles: []
})
export class DialogComponent {

// @ViewChildren => shadow DOM
// @ContentChildren => Light DOM.

  /* Parent: @ViewChild("dialogGeneric") dialogGeneric!: DialogComponent;  
      <ajm-dialog #dialogGeneric>
        <ng-template dialogX>
        </ng-template>
      </ajm-dialog> */

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  // =>   <ng-container *ngTemplateOutlet="templateRef; context: { $implicit: 'implicit'}" #template1 select="[dialogX]">
 
  public open: boolean | undefined = undefined;
  public x: string = "0px";
  public y: string = "10%";
  public width: string = "90%";
  public height: string = "80%";
  public Open = (open: true | undefined, x?: string, y?: string, width?: string, height?: string): void => {
    this.open = open;
    this.x = x || "0px";
    this.y = y || "10%";
    this.width = width || "90%";
    this.height = height || "80%";
  }
}
