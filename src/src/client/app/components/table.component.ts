import { Component, EventEmitter, Input, Output, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MenuComponent, MenuOption, MenuProps } from "../components/menu.component";

import { LoggerService } from "../services/logger.service";

// ajm: -----------------------------------------------------------------------
interface TableProps {
  header: TableHeaderProps;
  rows: TableRowProps[];
}

// ajm: -----------------------------------------------------------------------
@Component({
  imports: [DragDropModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  selector: "ajm-table",
  template: `
  <!-- usage <ajm-table #table [props] = this.Rows (OnRowSelect) = "OnRowSelect($event)">
  </ajm-table> -->
  <!-- <ajm-table-header [props]="props.header"></ajm-table-header> -->
  <!-- <ajm-table-row [props]="{background: ir.background, cells: ir.cells, index: ir.index }" cdkDrag (click)="this.OnSelect($event, ir.index);" (contextmenu)="this.OnContextMenu($event, ir.index);" /> -->
  <!-- <ajm-table-cell *ngFor="let ic of this.ir.cells" [props]="ic"/> -->
  
  <table style="display: block; tableLayout: fixed; width: 94vw;">
    <thead>
      <tr style="cursor: default; height: 32px">
        @for (ic of this.props.header.cells; track ic) {
          <th style="height: 20px;" [style.width]="ic.width">{{ic.content}}</th>
        }
      </tr>
    </thead>
    <tbody style="display: block; overflow: scroll; tableLayout: fixed; height: 80vh;" cdkDropList [cdkDropListData]="this.props.rows" (cdkDropListDropped)="OnDrop($event)">
      @for (ir of this.props.rows; track ir) {
        <tr [style.background]="ir.background" cdkDrag (click)="this.OnSelect($event);" (contextmenu)="this.OnContextMenu($event);">
          @for (ic of ir.cells; track ic) {
            <td [style.width]="ic.width">{{ic.content}}</td>
          }
        </tr>
      }
    </tbody>
  </table>
  <!-- menu: MenuComponent @Input() props -->
  <ajm-menu #menu [props]="this.menuProps" (OnOption)="OnOption($event)"></ajm-menu>`,
  styles: [
  ]
})

export class TableComponent {
  @ViewChild("menu") menu!: MenuComponent;

  constructor(public logger: LoggerService) {
    this.props = {
      header: {
        cells: [
          { content: "Column 1", width: "30vw" }, 
          { content: "Column 2", width: "30vw" }, 
          { content: "Column 3", width: "30vw" }
        ] 
      },
      rows: []
    }

    for (let i: number = 0; i < 30; i++) {
      this.props.rows.push(
        {
          background: "var(--color-background-modal)",
          cells: [
            { content: `Row ${i+1} Cell 1`, width: "30vw" }, 
            { content: `Row ${i+1} Cell 2`, width: "30vw" }, 
            { content: `Row ${i+1} Cell 3`, width: "30vw" } 
          ]
        });
    }
  }

  public JSON = JSON;
  public props!: TableProps;
  public selected!: HTMLTableRowElement;

  public menuProps: MenuProps = {
    open: false,
    options: [
    { type: "callback", target: "Option1", option: "Option1" },
    { type: "callback", target: "Option2", option: "Option2" },
    { type: "callback", target: "Option3", option: "Option3" } ],
    height: "130px",
    width: "200px",
  };

  public OnContextMenu(e: MouseEvent) {
    if (this.selected && this.selected!==e.target) {
      this.selected.style.background="var(--color-background-modal)";
    }
    this.selected=(e.target as HTMLTableCellElement).parentElement as HTMLTableRowElement;
    this.selected.style.background="var(--blue)";
    this.menuProps.x=`${e.pageX}px`;
    this.menuProps.y=`${e.pageY}px`;
    this.menuProps.open=true;
    e.preventDefault();
  }

  OnDrop(event: CdkDragDrop<any[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);      
      this.props.rows = event.container.data;
    }
  }

  public OnOption(option: MenuOption): void {
    this.menuProps.open=undefined;    
    switch(option.target) {
      case "Option1":
      break;
      case "Option2":
      break;
      case "Option3":
      break;
    }
  }

  public OnSelect(e: MouseEvent): void {
    if (this.selected && e.target!==this.selected) {
      this.selected.style.background="var(--color-background-modal)";
    }
    this.selected=(e.target as HTMLTableCellElement).parentElement as HTMLTableRowElement;
    this.selected.style.background="var(--blue)";
    this.menuProps.open=undefined;
  }
}


// ajm: -----------------------------------------------------------------------
export interface TableHeaderProps {
  cells: TableCellProps[];
}

// ajm: -----------------------------------------------------------------------
/* @Component({
  selector: "ajm-table-header",
  template: `
    <tr style="cursor: default; height: 32px">
      <ng-container *ngFor="let ic of this.props.cells">                      
        <th style="height: 20px;" [style.width]="ic.width">{{ic.content}}</th>
      </ng-container>
    </tr>`,
  styles: [
  ]
})
export class TableHeaderComponent {
  @Input() props!: TableHeaderProps;
}*/

// ajm: -----------------------------------------------------------------------
interface TableRowProps {
  background: string;
  cells: TableCellProps[];
}

// ajm: -----------------------------------------------------------------------
/* @Component({
  selector: "ajm-table-row",
  template: `
    <tr [style.background]="this.props.background" [index]="this.props.id">
      <ajm-table-cell *ngFor="let ic of this.props.cells" [props]="ic"/>
    </tr>`,
  styles: [
  ]
})

export class TableRowComponent {
  @Input() props!: TableRowProps;
}*/

// ajm: -----------------------------------------------------------------------
interface TableCellProps {
  content: string; // ajm: => any
  width: string;
}

// ajm: -----------------------------------------------------------------------
/* @Component({
  selector: "ajm-table-cell",
  template: `<td [style.width]="this.props.width">{{this.props.content}}</td>`,
  styles: [
  ]
})
export class TableCellComponent {
  @Input() props!: TableCellProps;
}*/

// ajm: -----------------------------------------------------------------------
