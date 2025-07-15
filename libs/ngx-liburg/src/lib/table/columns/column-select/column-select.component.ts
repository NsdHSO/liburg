import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseColumn } from '../../base-column';
import { DataSourceMaterialTable } from '../../table/table.component'; // Ensure this path is correct
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule, NgFor, NgIf
// PrimeNG Imports
import { DropdownModule } from 'primeng/dropdown'; // For p-dropdown

export interface ColumnSelect<T> {
  index: number;
  value: T;
  name: string; // Used for optionLabel in p-dropdown
}

@Component({
  selector: 'elix-column-select',
  templateUrl: './column-select.component.html',
  styleUrls: ['./column-select.component.scss'],
  providers: [
    {
      provide: BaseColumn,
      useExisting: ColumnSelectComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true, // Enable standalone component
  imports: [
    CommonModule, // For NgIf, NgFor
    FormsModule, // For ngModel
    DropdownModule, // PrimeNG Dropdown Module
  ],
})
export class ColumnSelectComponent<T> extends BaseColumn implements OnInit {
  @Input()
  options?: ColumnSelect<T>[]; // Change type to T to match generic component

  @Input()
  truthy: boolean = false;

  @Output()
  public onValueChanges: EventEmitter<DataSourceMaterialTable<T>> =
    new EventEmitter();

  // Reference to the templates defined in the HTML
  @ViewChild('columnSelectHeaderTemplate')
  public override headerTemplate!: TemplateRef<any>;

  @ViewChild('columnSelectBodyTemplate')
  public override bodyTemplate!: TemplateRef<any>;

  @ViewChild('columnSelectFooterTemplate')
  public override footerTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    if (this.options) {
      // Assuming 'name' is the property to sort by.
      // If 'value' is of a type that can be sorted, you might sort by it.
      // For objects, you often need a custom sort function if not sorting by a simple string/number property.
      // This line `this.options = this.options.sort();` might not work as intended for objects without a custom compare function.
      // Let's assume you want to sort by the 'name' property:
      this.options = this.options.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (this.truthy) {
      // Ensure 'value' property matches the generic type T if used elsewhere
      this.options = [
        {
          index: 1,
          value: true as T,
          name: 'True',
        },
        {
          index: 0,
          value: false as T,
          name: 'False',
        },
      ];
    }
  }

  public changeEntity(rowElement: DataSourceMaterialTable<T>) {
    this.onValueChanges.emit(rowElement);
  }
}
