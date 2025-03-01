import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {BaseColumn} from "../../base-column";
import {DataSourceMaterialTable} from "../../table/table.component";


export interface ColumnSelect<T> {
  index: number;
  value: T;
  name: string;
}


@Component({
  selector: 'elix-column-select',
  templateUrl: './column-select.component.html',
  styleUrls: ['./column-select.component.scss'],
  providers: [{ provide: BaseColumn, useExisting: ColumnSelectComponent }],
  encapsulation: ViewEncapsulation.None,
})
export class ColumnSelectComponent<T> extends BaseColumn implements OnInit {
  @Input()
  options?: ColumnSelect<boolean>[];

  @Input()
  truthy: boolean = false;
  @Output()
  public onValueChanges: EventEmitter<DataSourceMaterialTable<T>> =
    new EventEmitter();

  ngOnInit(): void {
    if (this.options) this.options = this.options.sort();
    if (this.truthy) {
      this.options = [
        { index: 1, value: true, name: 'True' },
        { index: 0, value: false, name: 'False' },
      ];
    }
  }

  public changeEntity(rowElement: DataSourceMaterialTable<T>) {
    this.onValueChanges.emit(rowElement);
  }
}
