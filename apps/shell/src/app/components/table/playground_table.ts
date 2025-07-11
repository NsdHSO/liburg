import { Component } from '@angular/core';
import { drivers } from '../../../assets/driver';
import {
  ColumnIconActionComponent,
  ColumnTextComponent,
  DataSourceMaterialTable,
  TableComponent,
} from '@ngx-liburg';
import { RouterLink } from '@angular/router';

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
  imports: [
    TableComponent,
    ColumnTextComponent,
    ColumnIconActionComponent,
    RouterLink,
  ],
  styles: `
    :host {
    .action, .edit-test {
      background-color: #000000;
      border: none;
    }
    }
  `,
})
export default class PlaygroundTableComponent {
  dataSource = drivers().map((driver: any) => {
    const model = {
      ...driver,
    };
    return {
      actions: [
        {
          iconClass: 'fa_solid:gauge',
          classCss: 'edit-test',
          method: (row: Driver) => console.log(row),
        },
      ],
      editable: true,
      model: {
        ...model,
      },
    } as DataSourceMaterialTable<Driver>;
  });
}
