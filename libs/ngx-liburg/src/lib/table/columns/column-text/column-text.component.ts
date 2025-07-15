import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseColumn } from '../../base-column';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { InputTextModule } from 'primeng/inputtext'; // For pInputText directive

@Component({
  selector: 'elix-column-text',
  templateUrl: './column-text.component.html',
  styleUrls: ['./column-text.component.scss'],
  providers: [
    {
      provide: BaseColumn,
      useExisting: ColumnTextComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true, // Enable standalone component
  imports: [
    CommonModule, // For NgIf
    FormsModule,
    InputTextModule, // PrimeNG InputText module
  ],
})
export class ColumnTextComponent<T> extends BaseColumn {
  @Output()
  public onValueChanges: EventEmitter<{ change: unknown }> = new EventEmitter();

  // Reference to the templates defined in the HTML
  @ViewChild('columnTextHeaderTemplate')
  public override headerTemplate!: TemplateRef<any>;

  @ViewChild('columnTextBodyTemplate')
  public override bodyTemplate!: TemplateRef<any>;

  @ViewChild('columnTextFooterTemplate')
  public override footerTemplate!: TemplateRef<any>;

  public changeEntity(rowElement: { change: unknown }) {
    this.onValueChanges.emit(rowElement);
  }
}
