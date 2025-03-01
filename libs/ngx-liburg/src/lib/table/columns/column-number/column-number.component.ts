import { Component, Input } from '@angular/core';
import { BaseColumn } from '../../base-column';
import { FormControl, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

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
    imports: [MatTableModule, NgIf, FormsModule, MatInputModule]
})
export class ColumnNumberComponent<T> extends BaseColumn {
  @Input()
  public override editRow = false;

  textValidator: FormControl = new FormControl();

  nonNumber!: boolean;

  changeEntity(element: any) {
    this.textValidator.valueChanges.subscribe((resp) => {
      console.log(resp);
    });
  }
}
