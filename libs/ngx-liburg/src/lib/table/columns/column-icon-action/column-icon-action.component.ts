import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseColumn } from '../../base-column';
import { CommonModule } from '@angular/common'; // Import NgFor
import { ButtonModule } from 'primeng/button'; // For pButton
import { RippleModule } from 'primeng/ripple'; // For pRipple
import { ColumnRotateService } from '../service/column-rotate.service'; // Assuming this path
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'elix-column-icon-action',
  templateUrl: './column-icon-action.component.html',
  styleUrls: ['./column-icon-action.component.scss'],
  providers: [
    {
      provide: BaseColumn,
      useExisting: ColumnIconActionComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule, // Provides NgIf and NgFor
    MatButton,
    MatIconModule,
  ],
})
export class ColumnIconActionComponent extends BaseColumn {
  @Input()
  public iconAction: boolean = false; // Input to control if action buttons are for scrolling

  @Output()
  public onScrollColumn: EventEmitter<string> = new EventEmitter<string>();

  private readonly _columnRotate = inject(ColumnRotateService); // Inject ColumnRotateService

  // Reference to the templates defined in the HTML
  @ViewChild('columnActionHeaderTemplate')
  public override headerTemplate!: TemplateRef<any>;

  @ViewChild('columnActionBodyTemplate')
  public override bodyTemplate!: TemplateRef<any>;

  @ViewChild('columnActionFooterTemplate')
  public override footerTemplate!: TemplateRef<any>;

  scrollColumn(left: string){
    this._columnRotate.setSide(left)
  }
}
