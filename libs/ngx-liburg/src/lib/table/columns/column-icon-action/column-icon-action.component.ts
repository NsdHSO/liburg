import { Component, Input } from '@angular/core';
import { BaseColumn } from '../../base-column';
import { ColumnRotateService } from '../service/column-rotate.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';

@Component({
    selector: 'elix-column-icon-action',
    templateUrl: './column-icon-action.component.html',
    styleUrls: ['./column-icon-action.component.scss'],
    providers: [
        {
            provide: BaseColumn,
            useExisting: ColumnIconActionComponent,
        },
    ],
    imports: [MatTableModule, MatButtonModule, MatIconModule, NgIf, NgForOf]
})
export class ColumnIconActionComponent extends BaseColumn {
  @Input()
  iconAction: boolean = false;

  constructor(private readonly _columnRotate: ColumnRotateService){
    super();
  }

  scrollColumn(left: string){
    this._columnRotate.setSide(left)
  }

}
