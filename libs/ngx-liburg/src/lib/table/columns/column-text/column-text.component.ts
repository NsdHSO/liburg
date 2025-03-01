import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseColumn } from '../../base-column';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'elix-column-text',
  standalone: true,
  templateUrl: './column-text.component.html',
  styleUrls: ['./column-text.component.scss'],
  providers: [
    {
      provide: BaseColumn,
      useExisting: ColumnTextComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatTableModule, MatInputModule, NgIf, FormsModule],
})
export class ColumnTextComponent<T> extends BaseColumn {
  @Output()
  public valueChanges: EventEmitter<{ change: unknown }> = new EventEmitter();

  public changeEntity(rowElement: { change: unknown }) {
    this.valueChanges.emit(rowElement);
  }
}
