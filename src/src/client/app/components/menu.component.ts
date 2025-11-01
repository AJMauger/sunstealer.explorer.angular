import { Component, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  selector: "ajm-menu",
  template: `
  <div class="menu" style="position: absolute;" [style.display]="this.props.open ? 'flex' : 'none'" [style.height]="props.height" [style.left]="props.x" [style.width]="props.width" [style.top]="props.y">
    <div>Menu</div>
    <hr />
    @for (io of this.props.options; track io) {
      <div>
        @switch (io.type) {
          @case ('break') {
            <hr />
          }
          @case ('callback') {
            <div class="menu-option" (click)="this.Select(io);">{{io.option}}</div>
          }
          @case ('router-link') {
            <div class="menu-option" routerLink="{{io.target}}">{{io.option}}</div>
          }
          <!-- <div *ngSwitchDefault="'Error'" class="menu-option" >{{io.option}}</div> -->
        }
      </div>
    }
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
