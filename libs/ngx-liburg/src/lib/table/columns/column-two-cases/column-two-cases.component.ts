import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BaseColumn} from "../../base-column";
import {DataSourceMaterialTable} from "../../table/table.component";

enum SelectEnum {
  TRUE= 'true',
  FALSE= 'false'
}

@Component({
             selector     : 'elix-column-two-cases',
             templateUrl  : './column-two-cases.component.html',
             styleUrls    : ['./column-two-cases.component.scss'],
             encapsulation: ViewEncapsulation.None,
              providers:[{provide: BaseColumn, useExisting: ColumnTwoCasesComponent}]
           })
export class ColumnTwoCasesComponent<T> extends BaseColumn implements OnInit {
  @Output()
  public onValueChanges : EventEmitter<DataSourceMaterialTable<T>> =
           new EventEmitter();

  public chosenList: Array<{value: SelectEnum, view: string}> = [{value: SelectEnum.FALSE, view: 'False'}, {value: SelectEnum.TRUE, view: 'True'}]

  public ngOnInit() : void {
  }

  public changeValue() {
  }

  public changeEntity(param : {change : {data : string; dataChanged : any}}) : void {
    console.log(param)
  }
}
