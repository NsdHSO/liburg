import { Component, signal } from '@angular/core';
import {
  TableComponent,
  ColumnTextComponent,
  ColumnNumberComponent,
  ColumnSelectComponent,
  ColumnAreaTextComponent,
  ColumnIconActionComponent,
  ColumnTwoCasesComponent,
  DataSourceMaterialTable,
  IActionMaterialColumn,
} from '@ngx-liburg';

interface DemoData {
  id: number;
  name: string;
  age: number;
  description: string;
  status: boolean;
  type: { value: string; name: string };
}

@Component({
  selector: 'liburg-table-demo',
  standalone: true,
  imports: [
    TableComponent,
    ColumnTextComponent,
    ColumnNumberComponent,
    ColumnSelectComponent,
    ColumnAreaTextComponent,
    ColumnIconActionComponent,
    ColumnTwoCasesComponent,
  ],
  template: `
    <div class="demo-container">
      <h2>ngx-liburg Table Demo</h2>
      
      <elix-table
        [dataSource]="tableData()"
        [zebraColor]="true"
        [showPagination]="true"
        [pageSize]="5"
        [footerShow]="true"
        [footerAmount]="true"
        [addedNewEntry]="true"
        (onAddEntry)="handleAddEntry()"
        (onPaginationChange)="handlePageChange($event)">
        
        <!-- Text Column -->
        <elix-column-text
          [field]="'name'"
          [name]="'Name'"
          [editRow]="true"
          (onValueChanges)="handleValueChange($event)">
        </elix-column-text>
        
        <!-- Number Column -->
        <elix-column-number
          [field]="'age'"
          [name]="'Age'"
          [editRow]="true">
        </elix-column-number>
        
        <!-- Area Text Column -->
        <elix-column-area-text
          [field]="'description'"
          [name]="'Description'">
        </elix-column-area-text>
        
        <!-- Select Column -->
        <elix-column-select
          [field]="'type'"
          [name]="'Type'"
          [options]="selectOptions"
          [editRow]="true">
        </elix-column-select>
        
        <!-- Two Cases Column -->
        <elix-column-two-cases
          [field]="'status'"
          [name]="'Status'"
          [editRow]="true">
        </elix-column-two-cases>
        
        <!-- Action Column -->
        <elix-column-icon-action
          [field]="'actions'"
          [name]="'Actions'">
        </elix-column-icon-action>
      </elix-table>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      
      h2 {
        margin-bottom: 1rem;
        color: #333;
      }
    }
  `]
})
export default class TableDemoComponent {
  // Sample data for select options
  selectOptions = [
    { index: 1, value: true, name: 'Active' },
    { index: 2, value: false, name: 'Inactive' },
  ];

  // Table data with signals for reactivity
  tableData = signal<DataSourceMaterialTable<DemoData>[]>([
    {
      model: {
        id: 1,
        name: 'John Doe',
        age: 30,
        description: 'Software Engineer with 5 years of experience',
        status: true,
        type: { value: 'type1', name: 'Type 1' },
      },
      editable: true,
      actions: this.getActions(),
    },
    {
      model: {
        id: 2,
        name: 'Jane Smith',
        age: 28,
        description: 'Product Manager specializing in SaaS',
        status: false,
        type: { value: 'type2', name: 'Type 2' },
      },
      editable: true,
      actions: this.getActions(),
    },
    {
      model: {
        id: 3,
        name: 'Mike Johnson',
        age: 35,
        description: 'Senior Developer with full-stack experience',
        status: true,
        type: { value: 'type3', name: 'Type 3' },
      },
      editable: true,
      actions: this.getActions(),
    },
  ]);

  private getActions(): IActionMaterialColumn[] {
    return [
      {
        iconClass: 'fa_solid:edit',
        classCss: 'edit-action',
        method: (row: DemoData) => this.handleEdit(row),
      },
      {
        iconClass: 'fa_solid:trash',
        classCss: 'delete-action',
        method: (row: DemoData) => this.handleDelete(row),
      },
    ];
  }

  handleEdit(row: DemoData) {
    console.log('Edit row:', row);
  }

  handleDelete(row: DemoData) {
    console.log('Delete row:', row);
    const currentData = this.tableData();
    this.tableData.set(currentData.filter(item => item.model.id !== row.id));
  }

  handleAddEntry() {
    const currentData = this.tableData();
    const newId = Math.max(...currentData.map(item => item.model.id)) + 1;
    
    const newEntry: DataSourceMaterialTable<DemoData> = {
      model: {
        id: newId,
        name: 'New Entry',
        age: 25,
        description: 'New team member',
        status: true,
        type: { value: 'type1', name: 'Type 1' },
      },
      editable: true,
      actions: this.getActions(),
    };

    this.tableData.set([...currentData, newEntry]);
  }

  handlePageChange(event: any) {
    console.log('Page changed:', event);
  }

  handleValueChange(event: any) {
    console.log('Value changed:', event);
  }
}
