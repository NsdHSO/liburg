import { Component, Input, OnDestroy, ViewChild, TemplateRef, inject } from '@angular/core';
import { BaseColumn } from '../../base-column';
import { FormsModule, FormControl } from '@angular/forms'; // Keep FormsModule for ngModel
import { AsyncPipe, CommonModule, NgIf } from '@angular/common'; // Import CommonModule
import { takeUntil } from 'rxjs/operators';
import { TableService } from '../../table/table.service';
import { Subject } from 'rxjs';
import { TotalAmountPipe } from '../utils/pipe/total-amount.pipe'; // Your custom pipe

// PrimeNG Imports
import { InputTextModule } from 'primeng/inputtext'; // For pInputText directive

@Component({
  selector: 'elix-column-number',
  templateUrl: './column-number.component.html',
  styleUrls: ['./column-number.component.scss'],
  providers: [
    {
      provide: BaseColumn,
      useExisting: ColumnNumberComponent,
    },
  ],
  standalone: true, // Enable standalone component
  imports: [
    CommonModule, // For NgIf, AsyncPipe
    FormsModule, // For ngModel
    InputTextModule, // PrimeNG InputText module
    TotalAmountPipe, // Your custom pipe
  ],
})
export class ColumnNumberComponent<T> extends BaseColumn {
  @Input()
  public override editRow: boolean = false;

  // textValidator and nonNumber seem unused for validation in your original HTML,
  // but if you intend to use them, ensure proper validation directives (e.g., Reactive Forms)
  // are integrated with PrimeNG input components if needed.
  textValidator: FormControl = new FormControl();
  nonNumber: boolean = false; // Initialize property

  public amountFooter: any;
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  private readonly _tableState = inject(TableService); // Using inject for TableService

  // Reference to the templates defined in the HTML
  @ViewChild('columnNumberHeaderTemplate')
  public override headerTemplate!: TemplateRef<any>;

  @ViewChild('columnNumberBodyTemplate')
  public override bodyTemplate!: TemplateRef<any>;

  @ViewChild('columnNumberFooterTemplate')
  public override footerTemplate!: TemplateRef<any>;
}
