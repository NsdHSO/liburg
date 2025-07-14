# ngx-liburg
# ngx-liburg

A powerful Angular table library with rich features and customizable components, built for modern Angular applications.

## Installation

```bash
npm install ngx-liburg
```

## Quick Start

1. Install the package
```bash
npm install ngx-liburg
```

2. Import the required components in your module or standalone component:
```typescript
import {
  TableComponent,
  ColumnTextComponent,
  ColumnNumberComponent,
  ColumnSelectComponent,
  ColumnAreaTextComponent,
  ColumnIconActionComponent,
  ColumnTwoCasesComponent,
} from '@ngx-liburg';
```

3. Add to your component imports:
```typescript
@Component({
  // ...
  imports: [
    TableComponent,
    ColumnTextComponent,
    ColumnNumberComponent,
    ColumnSelectComponent,
    ColumnAreaTextComponent,
    ColumnIconActionComponent,
    ColumnTwoCasesComponent,
  ],
  // ...
})
```

4. Basic usage example:
```typescript
interface YourData {
  id: number;
  name: string;
  age: number;
}

@Component({
  template: `
    <elix-table
      [dataSource]="tableData"
      [zebraColor]="true"
      [showPagination]="true">
      
      <elix-column-text
        field="name"
        name="Name"
        [editRow]="true">
      </elix-column-text>
      
      <elix-column-number
        field="age"
        name="Age"
        [editRow]="true">
      </elix-column-number>
    </elix-table>
  `
})
export class YourComponent {
  tableData: DataSourceMaterialTable<YourData>[] = [
    {
      model: { id: 1, name: 'John', age: 30 },
      editable: true,
      actions: []
    }
  ];
}
```

## Features

- Customizable table columns with different data types
- Editable cells
- Sorting and filtering
- Responsive design
- Drag and drop functionality
- Pagination
- Footer aggregation
- Expandable rows
- Action columns
- Tooltip support

## Table Components

### Main Table Component (`elix-table`)

#### Basic Usage

```typescript
import { TableComponent, ColumnTextComponent, DataSourceMaterialTable } from '@ngx-liburg';

@Component({
  imports: [TableComponent, ColumnTextComponent],
  // ...
})
export class YourComponent {
  dataSource: DataSourceMaterialTable[] = [
    {
      model: yourData,
      editable: true,
      actions: [
        {
          iconClass: 'your-icon-class',
          classCss: 'your-css-class',
          method: (row) => console.log(row)
        }
      ]
    }
  ];
}
```

```html
<elix-table 
  [dataSource]="dataSource"
  [zebraColor]="true"
  [showPagination]="true"
  [pageSize]="10"
  [footerShow]="true">
  <!-- Column definitions go here -->
</elix-table>
```

#### Table Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| dataSource | DataSourceMaterialTable[] | required | The data to display in the table |
| zebraColor | boolean | false | Enables zebra striping for rows |
| showPagination | boolean | false | Shows pagination controls |
| pageSize | number | 10 | Number of items per page |
| pageSizeOptions | number[] | [10, 20, 50] | Available page size options |
| footerShow | boolean | false | Shows footer row |
| footerAmount | boolean | false | Shows total amount in footer |
| addedNewEntry | boolean | false | Enables new entry button |
| extensible | boolean | false | Enables expandable rows |
| filterTooltip | boolean | true | Enables tooltips |

### Column Components

#### 1. Text Column (`elix-column-text`)
For displaying and editing text values.

```html
<elix-column-text 
  [field]="'fieldName'"
  [name]="'Column Header'"
  [className]="'custom-class'"
  [editRow]="true">
</elix-column-text>
```

#### 2. Number Column (`elix-column-number`)
For displaying and editing numeric values.

```html
<elix-column-number 
  [field]="'numericField'"
  [name]="'Number Column'"
  [editRow]="true">
</elix-column-number>
```

#### 3. Select Column (`elix-column-select`)
For dropdown selection fields.

```html
<elix-column-select 
  [field]="'selectField'"
  [name]="'Select Column'"
  [options]="selectOptions"
  [editRow]="true">
</elix-column-select>
```

#### 4. Area Text Column (`elix-column-area-text`)
For displaying and editing larger text content with tooltip support.

```html
<elix-column-area-text 
  [field]="'textAreaField'"
  [name]="'Text Area'"
  [width]="400">
</elix-column-area-text>
```

#### 5. Icon Action Column (`elix-column-icon-action`)
For displaying action buttons with icons.

```html
<elix-column-icon-action 
  [field]="'actions'"
  [name]="'Actions'"
  [iconAction]="false">
</elix-column-icon-action>
```

#### 6. Two Cases Column (`elix-column-two-cases`)
For boolean/toggle values.

```html
<elix-column-two-cases 
  [field]="'booleanField'"
  [name]="'Toggle'"
  [editRow]="true">
</elix-column-two-cases>
```

### Data Interfaces

#### Table Data Interface
```typescript
interface DataSourceMaterialTable<T> {
  model: T;                   // Your data model
  editable: boolean;          // Whether the row is editable
  actions: IActionMaterialColumn[]; // Action buttons configuration
  id?: number;               // Optional identifier
}

interface IActionMaterialColumn {
  iconClass: string;         // Icon class for the action button (e.g., 'fa_solid:edit')
  classCss: string;         // CSS class for styling
  method: (row?: any) => void; // Action callback
}
```

#### Select Column Options Interface
```typescript
interface ColumnSelect<T> {
  index: number;    // Unique identifier for the option
  value: T;         // The value to be stored
  name: string;     // Display text for the option
}
```

### Complete Example

Here's a comprehensive example showcasing all features:

```typescript
interface DemoData {
  id: number;
  name: string;
  age: number;
  description: string;
  status: boolean;
  type: { value: string; name: string };
}

@Component({
  template: `
    <elix-table
      [dataSource]="tableData"
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
        field="name"
        name="Name"
        [editRow]="true"
        (onValueChanges)="handleValueChange($event)">
      </elix-column-text>
      
      <!-- Number Column -->
      <elix-column-number
        field="age"
        name="Age"
        [editRow]="true">
      </elix-column-number>
      
      <!-- Area Text Column -->
      <elix-column-area-text
        field="description"
        name="Description">
      </elix-column-area-text>
      
      <!-- Select Column -->
      <elix-column-select
        field="type"
        name="Type"
        [options]="selectOptions"
        [editRow]="true">
      </elix-column-select>
      
      <!-- Two Cases Column (Boolean) -->
      <elix-column-two-cases
        field="status"
        name="Status"
        [editRow]="true">
      </elix-column-two-cases>
      
      <!-- Action Column -->
      <elix-column-icon-action
        field="actions"
        name="Actions">
      </elix-column-icon-action>
    </elix-table>
  `
})
export class TableDemoComponent {
  selectOptions: ColumnSelect<boolean>[] = [
    { index: 1, value: true, name: 'Active' },
    { index: 2, value: false, name: 'Inactive' }
  ];

  tableData: DataSourceMaterialTable<DemoData>[] = [
    {
      model: {
        id: 1,
        name: 'John Doe',
        age: 30,
        description: 'Software Engineer',
        status: true,
        type: { value: 'type1', name: 'Type 1' }
      },
      editable: true,
      actions: [
        {
          iconClass: 'fa_solid:edit',
          classCss: 'edit-action',
          method: (row) => this.handleEdit(row)
        },
        {
          iconClass: 'fa_solid:trash',
          classCss: 'delete-action',
          method: (row) => this.handleDelete(row)
        }
      ]
    }
  ];
}
```

### Styling

The table components support custom styling through CSS classes:

```scss
elix-table {
  mat-table {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px;
    
    // Zebra striping
    .zebra {
      background-color: #eee;
    }
    
    // Row hover effect
    mat-row:hover {
      background: rgba(1, 1, 222, 0.1);
    }
    
    // Cell styles
    mat-cell {
      color: black;
      min-height: 32px;
      
      // Input field styles
      mat-form-field {
        .mat-form-field-infix {
          width: auto;
        }
      }
    }
  }
}

// Action button styles
.edit-action {
  color: #52796f;
}

.delete-action {
  color: #ff4444;
}
```

### Event Handling

The table component emits several events you can handle:

```typescript
// Pagination events
(onPaginationChange)="handlePageChange($event)"

// New entry events
(onAddEntry)="handleAddEntry()"

// Column value changes
(onValueChanges)="handleValueChange($event)"
```

### Advanced Features

1. **Dynamic Column Display**:
  - Columns automatically adjust based on screen size
  - Use `iconAction` for column navigation on small screens

2. **Footer Aggregation**:
  - Enable with `[footerShow]="true"`
  - Configure total amount display with `[footerAmount]="true"`

3. **Row Actions**:
  - Configure multiple actions per row
  - Custom icons and styling
  - Action callbacks with row context

4. **Editable Cells**:
  - Enable with `[editRow]="true"`
  - Inline editing for all column types
  - Validation support

5. **Drag and Drop**:
  - Built-in row reordering
  - Smooth animations
  - Automatic state update

### Best Practices

1. **Performance**:
  - Use `trackBy` functions for large datasets
  - Implement virtual scrolling for large tables
  - Use reactive forms for complex editing

2. **Accessibility**:
  - Provide meaningful labels
  - Use ARIA attributes where needed
  - Ensure keyboard navigation

3. **Error Handling**:
  - Implement proper validation
  - Show user-friendly error messages
  - Handle edge cases gracefully

## Running Tests

```bash
nx test ngx-liburg
```

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Breaking Changes

### vNEXT

- **Dependency Injection:** The TableComponent and other components now use Angular's `inject()` function for service injection instead of constructor parameters. If you extend or mock these components, update your code accordingly.
- **Private Service Fields:** Service dependencies like `TableService`, `ColumnRotateService`, and `ChangeDetectorRef` are now private readonly fields injected via `inject()`. Access them as `this._tableState`, `this._columnRotate`, and `this._changeDetectorRef`.
- **Standalone/Signal API:** If you use Angular signals or standalone components, ensure your Angular version supports these features.
- **Column Definitions:** Dynamic column logic now requires that all column names in `columnsToDispaly` have a matching column definition in the template. Mismatches will throw errors at runtime.

Please review your custom code and integrations for compatibility with these changes.

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test ngx-liburg` to execute the unit tests.
