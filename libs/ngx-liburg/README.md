# ngx-liburg

A powerful Angular table library with rich features and customizable components.

## Installation

```bash
npm install ngx-liburg
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

### Data Interface

```typescript
interface DataSourceMaterialTable<T> {
  model: T;                   // Your data model
  editable: boolean;          // Whether the row is editable
  actions: IActionMaterialColumn[]; // Action buttons configuration
  id?: number;               // Optional identifier
}

interface IActionMaterialColumn {
  iconClass: string;         // Icon class for the action button
  classCss: string;         // CSS class for styling
  method: (row?: any) => void; // Action callback
}
```

### Styling

The table components support custom styling through CSS classes and provide default styles that can be overridden:

```scss
elix-table {
  // Custom table styles
  mat-table {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
  }
}
```

## Running unit tests

Run `nx test ngx-liburg` to execute the unit tests.
