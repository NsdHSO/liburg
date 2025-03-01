import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameWholeModule } from '@ngx-liburg-frame-side';
import { IconCoreModule } from '@ngx-liburg-icon';
import { drivers } from '../assets/driver';
import { ColumnIconActionComponent, ColumnTextComponent, DataSourceMaterialTable, TableComponent } from '@ngx-liburg';

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
  standalone: true,
  imports: [
    RouterModule,
    FrameWholeModule,
    IconCoreModule,
    TableComponent,
    ColumnTextComponent,
    ColumnIconActionComponent,
  ],
  selector: 'liburg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';

  dataSource = drivers().map((driver: any) => {
    const model = {
      ...driver,
    };
    return {
      actions: [
        {
          iconClass: 'fa_solid:gauge',
          classCss: 'edit',
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
