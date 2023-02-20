import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ajm-dialog',
  template: `
  <dialog style="height: {{this.height}}; left: {{this.x}}; top: {{this.y}}; width: {{this.width}};" open={{this.open}} >
    <ng-container *ngTemplateOutlet="templateRef; context: {}">
    </ng-container>
  </dialog>`,
  styles: []
})
export class DialogComponent {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any> | null = null;

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
