import { JsonPipe, NgForOf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ColumnIconActionComponent,
  ColumnTextComponent,
  DataSourceMaterialTable,
  TableComponent,
} from '@ngx-liburg';
import { drivers, drivers3 } from '../../../assets/driver';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

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
    JsonPipe,
    NgForOf,
    MatButton,
    TableComponent,
  ],
  styles: `
    :host {
      h1 {
        view-transition-name: router-transition-1
      }
    }
  `,
})
export default class PlaygroundTableComponent {
  onPaginationChange($event: any) {
    console.log('Pagination changed:', $event);
  }
  private router = inject(Router);

  dataSource = signal(
    drivers().map((driver: any) => {
      const model = {
        ...driver,
      };
      return {
        actions: [
          {
            iconClass: 'fa_solid:crop-simple',
            classCss: 'edit',
            method: (row: Driver) => console.log(row),
          },
        ],
        editable: true,
        model: {
          ...model,
        },
      } as DataSourceMaterialTable<Driver>;
    })
  );
  dataSource3 = signal(
    drivers3().map((driver: any) => {
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
      } as DataSourceMaterialTable<Driver>;
    })
  );

  test = [
    {
      dataSource: signal(
        this.dataSource().map((item: any) => JSON.parse(JSON.stringify(item)))
      ),
      rows: [
        {
          className: 'emergency-ic',
          field: 'fuelType',
          name: 'Edit Emergency IC',
        },
        { className: 'action3', field: 'action2', name: 'Action' },
      ],
    },
    {
      dataSource: signal(
        this.dataSource3().map((item: any) => JSON.parse(JSON.stringify(item)))
      ),
      rows: [
        { className: 'emergency-ic', field: 'test', name: 'Edit Emergency IC' },
        { className: 'action3', field: 'action', name: 'Action' },
      ],
    },
  ];
  /**
   * Navigate to load the table-sidebar component in the drawer outlet
   * and open the drawer
   */
  openTableSidebar() {
    this.router.navigate([{ outlets: { drawer: ['table-sidebar'] } }], {
      skipLocationChange: false,
    });
    // The drawer will open automatically via the router event listener in DrawerService
  }

  /**
   * Navigate to load the help-sidebar component in the drawer outlet
   * and open the drawer
   */
  openHelpSidebar() {
    this.router.navigate([{ outlets: { drawer: ['help-sidebar'] } }], {
      skipLocationChange: false,
    });
    // The drawer will open automatically via the router event listener in DrawerService
  }
}
