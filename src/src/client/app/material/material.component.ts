import { Component, ViewChild } from "@angular/core";
import { MatDatepicker } from "@angular/material/datepicker";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sort } from "@angular/material/sort";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FlatTreeControl } from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNodeDef} from '@angular/material/tree';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from "@angular/material/core"
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRippleModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";

interface TreeDataNode {
  name: string;
  children?: TreeDataNode[];
}

interface TreeFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  imports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatIconModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, MatMomentDateModule, ReactiveFormsModule],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }],
  selector: "app-material",
  template: `
    <div style="height: 100%; padding: 10px; overflow-y: auto; user-select: none;">
    <mat-toolbar>
      <button mat-icon-button [matMenuTriggerFor]="menu"><mat-icon>menu</mat-icon></button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>Menu item 1</button>
        <button mat-menu-item>Menu item 2</button>
        <button mat-menu-item>Menu item 3</button>
      </mat-menu>
      <span matTooltip="Tooltip">Sunstealer</span>
      <span style="flex: 1 1 auto;"></span>
      <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon"><mat-icon>favorite</mat-icon></button>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon"><mat-icon>share</mat-icon></button>
    </mat-toolbar>
    <br />
    <mat-label>mat-tab-group</mat-label>    
    <mat-tab-group>
      <mat-tab label="material button"> 
        <hr />
        <mat-label>mat-flat-button</mat-label>
        <br /><br />
        <button style="width: 120px;" mat-flat-button color="primary"><mat-icon>home</mat-icon>Primary</button>
        <button style="margin-left: 10px; width: 120px;" mat-flat-button color="accent"><mat-icon>settings</mat-icon>Accent</button>
        <button style="margin-left: 10px; width: 120px;" mat-flat-button color="warn"><mat-icon>warning</mat-icon>Warn</button>
        <button style="margin-left: 10px; width: 120px; background-color: var(--red);" mat-flat-button color="error"><mat-icon>error</mat-icon>Error</button>
        <br /><br />
        <hr />
        <mat-label>mat-button-toggle-group</mat-label>
        <br /><br />
        <mat-button-toggle-group>
          <mat-button-toggle style="color: #ff5050;" value="1">mat-button-toggle</mat-button-toggle>
          <mat-button-toggle value="2">mat-button-toggle</mat-button-toggle>
          <mat-button-toggle style="color: var(--blue);" value="3">mat-button-toggle</mat-button-toggle>
        </mat-button-toggle-group>
        <br /><br />
        <hr />
        <mat-label>mat-checkbox</mat-label>
        <br />
        <mat-checkbox color="primary">Checkbox</mat-checkbox> 
        <br /><br />
        <hr />
        <mat-label>mat-radio-group</mat-label>
        <br />
        <mat-radio-group>
          <mat-radio-button color="primary" value="1">Radio Option 1</mat-radio-button>
          <mat-radio-button color="primary" value="2">Radio Option 2</mat-radio-button>
        </mat-radio-group>
        <br /><br />
        <hr />
        <mat-label>mat-chip-listbox</mat-label>
        <br /><br />
        <mat-chip-listbox>
          <mat-chip-option>Potato</mat-chip-option>
          <mat-chip-option>Wood</mat-chip-option>
          <mat-chip-option selected>Silicon</mat-chip-option>
        </mat-chip-listbox>
        <br />
        <hr />
        <mat-label>mat-slide-toggle</mat-label>
        <br /><br />
        <mat-slide-toggle>mat-slide-toggle</mat-slide-toggle>
      </mat-tab>

      <mat-tab label="material controls"> 
        <br />
        <hr />
        <mat-label>mat-progress-bar</mat-label>
        <br /><br />
        <mat-progress-bar mode="determinate" value="40"></mat-progress-bar>
        <br /><br />
        <hr />
        <mat-label>mat-spinner</mat-label>
        <br /><br />
        <mat-spinner></mat-spinner>
        <br /><br />
        <hr />
        <mat-label>mat-slider</mat-label>
        <br /><br />
        <mat-slider style="margin-left: 10px; width: 50%;"><input matSliderThumb></mat-slider>
      </mat-tab>

      <mat-tab label="material form">
        <hr />
        <mat-label>mat-datepicker</mat-label>
        <br /><br />
        <mat-form-field appearance="fill">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker">
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <br /><br />
        <hr />
        <mat-label>input</mat-label>
        <br /><br />
        <mat-form-field style="align-items: flex-start; display: flex; flex-direction: column; width: 25%;">
          <mat-label>Input</mat-label>
          <input matInput>
        </mat-form-field>
        <hr />
        <mat-label>mat-select</mat-label>
        <br /><br />
        <mat-form-field style="align-items: flex-start; display: flex; flex-direction: column; width: 25%;">
          <mat-label>Select</mat-label>
          <mat-select>
            <mat-option value="1">mat-option 1</mat-option>
            <mat-option value="2">mat-option 2</mat-option>
            <mat-option value="3">mat-option 3</mat-option>
          </mat-select>
        </mat-form-field>
        <hr />
        <mat-label>textarea</mat-label>
        <br /><br />
        <mat-form-field style="align-items: flex-start; display: flex; flex-direction: column; width: 25%;">
          <mat-label>Textarea</mat-label>
          <textarea matInput></textarea>
        </mat-form-field>
      </mat-tab>

      <mat-tab label="material panel">
        <hr />
        <mat-label>mat-card</mat-label>
        <br /><br />
        <mat-card>
          <mat-card-content>Simple card</mat-card-content>
        </mat-card>
        <br />
        <hr />
        <mat-label>mat-expansion-panel</mat-label>
        <br /><br />
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title style="color: var(--blue);">mat-panel-title</mat-panel-title>
            <mat-panel-description style="color: var(--blue);">mat-panel-description</mat-panel-description>
          </mat-expansion-panel-header>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </mat-expansion-panel>
        <mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false"></mat-expansion-panel>
        <br />
        <hr />
        <mat-label>mat-list</mat-label>
        <br /><br />
        <mat-list role="list">
          <mat-list-item role="listitem">mat-list-item 1</mat-list-item>
          <mat-list-item role="listitem">mat-list-item 2</mat-list-item>
          <mat-list-item role="listitem">mat-list-item 3</mat-list-item>
        </mat-list>
      </mat-tab>

      <mat-tab label="material table mat-sort-header">
        <hr />
        <mat-label>mat-table mat-sort-header</mat-label>    
        <br /><br />
        <table mat-table [dataSource]="this.sortedTableData" matSort (matSortChange)="this.SortTableData($event)">
          <ng-container matColumnDef="col1">
            <th style="background-color: var(--blue);" mat-header-cell *matHeaderCellDef mat-sort-header="col1"> Column 1 </th>
            <td mat-cell *matCellDef="let cell"> {{cell.col1}} </td>
          </ng-container>
          <ng-container matColumnDef="col2">
            <th style="background-color: var(--blue);" mat-header-cell *matHeaderCellDef mat-sort-header="col2"> Column 2 </th>
            <td mat-cell *matCellDef="let cell"> {{cell.col2}} </td>
          </ng-container>
          <ng-container matColumnDef="col3">
            <th style="background-color: var(--blue);" mat-header-cell *matHeaderCellDef mat-sort-header="col3"> Column 3 </th>
            <td mat-cell *matCellDef="let cell"> {{cell.col3}} </td>
          </ng-container>
          <ng-container matColumnDef="col4">
            <th style="background-color: var(--blue);" mat-header-cell *matHeaderCellDef mat-sort-header="col4"> Column 4 </th>
            <td mat-cell *matCellDef="let cell"> {{cell.col4}} </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="tableColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: tableColumns;"></tr>
        </table>
        <br />          
      </mat-tab>

      <mat-tab label="material tree">
        <hr />
        <mat-label>mat-tree</mat-label>    
        <br /><br />
        <mat-tree [dataSource]="this.dataSource" [treeControl]="this.treeControl">
          <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding><div style="width: 20px;"></div>{{node.name}}</mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let node; when: this.TreeNodeExpandable" matTreeNodeToggle matTreeNodePadding>
            <button mat-icon-button matTreeNodeToggle>
              <mat-icon class="mat-icon-rtl-mirror">{{treeControl.isExpanded(node) ? "expand_more" : "chevron_right"}}</mat-icon>
            </button>
            {{node.name}}
          </mat-tree-node>

        </mat-tree>
      </mat-tab>

      <mat-tab label="material other">
        <hr />
        <mat-label>MatSnackBar</mat-label>
        <br /><br />
        <mat-form-field appearance="fill">
          <mat-label>Message</mat-label>
          <input matInput value="Message" #message>
        </mat-form-field>
        <mat-form-field style="margin-left: 10px;" appearance="fill">
          <mat-label>Action</mat-label>
          <input matInput value="Action" #action>
        </mat-form-field>
        <br />    
        <button mat-flat-button (click)="OpenSnackBar(message.value, action.value)">Activate</button>
        <br /><br />
        <hr />
        <mat-label>mat-stepper</mat-label>    
        <br /><br />
        <mat-stepper style="width: calc(100%-10px);" #stepper>
          <mat-step [stepControl]="stepperFormGroup0" errorMessage="Given name is required.">
            <form [formGroup]="stepperFormGroup0">
              <ng-template matStepLabel>Enter your given name</ng-template>
              <mat-form-field appearance="fill">
                <mat-label>Given name</mat-label>
                <input matInput placeholder="Given name" formControlName="control0" required>
              </mat-form-field>
              <div>
                <button mat-button matStepperNext>Next</button>
              </div>
            </form>
          </mat-step>
          <mat-step [stepControl]="stepperFormGroup1" errorMessage="Family name is required.">
            <form [formGroup]="stepperFormGroup1">
              <ng-template matStepLabel>Enter your family name</ng-template>
              <mat-form-field appearance="fill">
                <mat-label>Family name</mat-label>
                <input matInput placeholder="Mauger" formControlName="control0" required>
              </mat-form-field>
              <div>
                <button mat-button matStepperPrevious>Back</button>
                <button mat-button matStepperNext>Next</button>
              </div>
            </form>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>Done</ng-template>
            <p>Complete.</p>
            <div>
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button (click)="stepper.reset()">Reset</button>
            </div>
          </mat-step>
        </mat-stepper>
      </mat-tab>

    </mat-tab-group>

    <br />
    <hr />
    <mat-label>mat-paginator</mat-label>
    <br /><br />
    <mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
    <br />
    <hr />
  </div>`,
  styles: [
    /* Nope! ":host ::ng-deep .mat-slide-toggle-label { color: var(--blue); }" */
  ]
})

export class MaterialComponent {
  @ViewChild(MatDatepicker) datepicker!: MatDatepicker<Date>;

  public panelOpenState: boolean = false;

  public constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    // ajm: stepper
    this.stepperFormGroup0 = this.formBuilder.group({
      control0: ["", Validators.required],
    });
    this.stepperFormGroup1 = this.formBuilder.group({
      control0: ["", Validators.required],
    });
    this.sortedTableData=this.TableData().slice();
    this.dataSource.data = this.treeData;
  }

  public Compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public OpenSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  // ajm: stepper
  public stepperFormGroup0;
  
  public stepperFormGroup1;

  // table
  public sortedTableData: any[];
  public tableColumns=["col1", "col2", "col3", "col4"];

  public SortTableData(sort: Sort) {
    const data = this.TableData().slice();
    if (!sort.active || sort.direction === "") {
      this.sortedTableData = data;
      return;
    }

    this.sortedTableData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "col1":
          return this.Compare(a.col1, b.col1, isAsc);
        case "col2":
          return this.Compare(a.col2, b.col2, isAsc);
        case "col3":
          return this.Compare(a.col3, b.col3, isAsc);
        case "col4":
          return this.Compare(a.col4, b.col4, isAsc);
        default:
          return 0;
      }
    });
  }

  public TableData = (): any[] => {
    const data: any[] = new Array<any>();
    for (let i: number  = 0; i<10; i++) {
      data.push({ col1: `row${i} col1`, col2: `row${i} col2`, col3: `row${i} col3`, col4: `row${i} col4` });
    }
    return data;
  };

  public treeData: TreeDataNode[] = [
    {
      name: "Node 1",
      children: [
        {
          name: "Node 1.1",
          children: [{name: "Leaf 1.1.1"}],
        },
        {
          name: "Node 1.2",
          children: [{name: "Leaf 1.2.1"}, {name: "Leaf 1.2.2"}],
        }
      ]
    }
  ];

  public TreeNodeExpandable = (index: number, node: TreeFlatNode): boolean => node.expandable;

  public treeControl = new FlatTreeControl<TreeFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  public treeFlattener = new MatTreeFlattener(
    ((node: TreeDataNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
      };
    }),
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
}


