import { Component, Input } from '@angular/core';
import { BaseColumn } from '../../base-column';
import { ColumnRotateService } from "../service/column-rotate.service";

@Component({
  selector: 'elix-column-icon-action',
  templateUrl: './column-icon-action.component.html',
  styleUrls: [ './column-icon-action.component.scss' ],
  providers: [ {
    provide: BaseColumn,
    useExisting: ColumnIconActionComponent
  } ],
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
