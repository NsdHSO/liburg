import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  inject // Added inject for ColumnRotateService
} from '@angular/core';
import { BaseColumn } from '../../base-column';
import { CommonModule, NgIf, NgFor } from '@angular/common'; // Import NgFor
import { ButtonModule } from 'primeng/button'; // For pButton
import { RippleModule } from 'primeng/ripple'; // For pRipple
import { ColumnRotateService } from "../service/column-rotate.service"; // Assuming this path
import { MatIconModule } from '@angular/material/icon';

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
    ButtonModule,
    RippleModule,
    MatIconModule
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
}
