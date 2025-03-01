import {
  LayoutModule
} from '@angular/cdk/layout';
import {
  CommonModule
} from '@angular/common';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatPaginatorModule
} from '@angular/material/paginator';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatSlideToggleModule
} from "@angular/material/slide-toggle";
import {
  MatTableModule
} from '@angular/material/table';
import {
  ColumnAreaTextComponent
} from './columns/column-area-text/column-area-text.component';
import {
  ColumnIconActionComponent
} from './columns/column-icon-action/column-icon-action.component';
import {
  ColumnNumberComponent
} from './columns/column-number/column-number.component';
import {
  ColumnSelectComponent
} from './columns/column-select/column-select.component';
import {
  ColumnTextComponent
} from './columns/column-text/column-text.component';
import {
  ColumnTwoCasesComponent
} from "./columns/column-two-cases/column-two-cases.component";
import {
  TableComponent
} from './table/table.component';
import {
  TooltipComponent
} from "./tooltip/tooltip.component";
import {
  DragDropModule
} from '@angular/cdk/drag-drop';
import { ActionComponent } from './columns/action/action.component';

@NgModule({
  declarations: [
    TableComponent,
    ColumnTextComponent,
    ColumnAreaTextComponent,
    ColumnIconActionComponent,
    TooltipComponent,
    ColumnNumberComponent,
    ColumnSelectComponent,
    ColumnTwoCasesComponent,
    ActionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    LayoutModule,
    MatTableModule,
    MatSlideToggleModule,
    DragDropModule
  ],
  exports: [
    TableComponent,
    ColumnTextComponent,
    ColumnAreaTextComponent,
    ColumnIconActionComponent,
    TooltipComponent,
    ColumnNumberComponent,
    ColumnSelectComponent,
    ColumnTwoCasesComponent,
  ],
})
export class TableMaterialModule {
}
