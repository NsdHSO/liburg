import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  ColumnIconActionComponent,
  ColumnTextComponent,
  DataSourceMaterialTable,
  TableComponent,
} from '@ngx-liburg';
import { drivers } from '../../../assets/driver';

export interface Driver {
  personalInfo: {
    name: string;
    age: number;
    address: {
      street: string;
      houseNumber: number;
    };
  };
}

@Component({
  selector: 'liburg-table',
  templateUrl: './playground_table.html',
  imports: [TableComponent, ColumnTextComponent, ColumnIconActionComponent, JsonPipe],
  styles: `
    :host {
      h1 {
        view-transition-name: router-transition-1
      }
    }
  `,
})
export default class PlaygroundTableComponent {
  dataSource = signal(drivers().map((driver: any) => {
    const model = {
      ...driver,
    };
    return {
      actions: [
        {
          iconClass: 'fa_solid:d',
          classCss: 'edit',
          method: (row: Driver) => console.log(row),
        },
      ],
      editable: true,
      model: {
        ...model,
      },
    } as DataSourceMaterialTable<Driver>}))

}
