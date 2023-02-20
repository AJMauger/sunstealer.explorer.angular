import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface MenuProps {
  option?: string;
  target?: any;
  type: string | undefined;
}

@Component({
  selector: "ajm-menu",
  template: `
  <dialog style="border-radius: 0px; height: 300px; left: calc(-100% + 255px); padding: 10px; top: 15px; width: 215px;" open={{this.open}} (click)="this.Open(undefined);">
    <div style="alignItems: center; display: flex; flex-direction: row; height: 24; justify-content: space-between;">
      <div>Menu</div>
      <div class="icon-close dialog-toolbar-icon" style="height: 18px; right: 10px; width: 18px;" (click)="this.Open(undefined)"></div>
    </div>
    <hr />
    <div *ngFor="let io of this.props">
      <ng-container [ngSwitch]="io.type">
        <hr *ngSwitchCase="'break'" />
        <div *ngSwitchCase="'callback'" class="menu-option" (click)="this.Select(io);">{{io.option}}</div>
        <div *ngSwitchCase="'router-link'" class="menu-option" routerLink="{{io.target}}">{{io.option}}</div>
      </ng-container>
</div>
  </dialog>`,
  styles: []
})

export class MenuComponent {
  // @Input / @Output = simple data binding.
  @Input() props: MenuProps[] = new Array<MenuProps>();
  @Output() OnOption: EventEmitter<any> = new EventEmitter();

  public open: boolean | undefined = undefined;
  public Open = (open: true | undefined): void => {
    this.open = open;
  }

  public Select = (option: MenuProps) => {
    this.OnOption.emit(option);
  }
}
