import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface MenuOption {
  option?: string;
  target?: any;
  type: string | undefined
}

export interface MenuProps {
  open?: boolean;
  options: MenuOption[];
  height: string;
  width: string;
  x?: string;
  y?: string;
}

@Component({
  selector: "ajm-menu",
  template: `
  <div class="menu" style="position: absolute;" [style.display]="this.props.open ? 'flex' : 'none'" [style.height]="props.height" [style.left]="props.x" [style.width]="props.width" [style.top]="props.y">
    <div>Menu</div>
    <hr />
    <div *ngFor="let io of this.props.options">
      <ng-container [ngSwitch]="io.type">
        <hr *ngSwitchCase="'break'" />
        <div *ngSwitchCase="'callback'" class="menu-option" (click)="this.Select(io);">{{io.option}}</div>
        <div *ngSwitchCase="'router-link'" class="menu-option" routerLink="{{io.target}}">{{io.option}}</div>
        <!-- <div *ngSwitchDefault="'Error'" class="menu-option" >{{io.option}}</div> -->
      </ng-container>
    </div>
</div>`,
  styles: []
})

export class MenuComponent {
  // @Input / @Output = simple data binding.
  @Input() props!: MenuProps;
  @Output() OnOption: EventEmitter<any> = new EventEmitter();

  public Select = (option: MenuOption) => {
    this.OnOption.emit(option);
  }
}
