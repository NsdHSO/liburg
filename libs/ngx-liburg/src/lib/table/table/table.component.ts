import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChildren,
  EventEmitter,
  inject,
  input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseColumn } from '../base-column';
import { ColumnRotateService } from '../columns/service/column-rotate.service';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { FooterAmountComponent } from '../components/footer-amount/footer-amount.component';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';

export interface IActionMaterialColumn {
  iconClass: string;
  classCss: string;
  method: (row?: any) => void;
}

export interface DataSourceMaterialTable<T> {
  model: T;
  editable: boolean;
  actions: IActionMaterialColumn[];
  id?: number;
}

@Component({
  selector: 'elix-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0',
        })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    MatPaginatorModule,
    ButtonModule,
    RippleModule,
    FooterAmountComponent,
    MatIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // Consider OnPush for signal-based components
})
export class TableComponent<T> implements AfterViewInit, AfterContentInit {
  /**
   * The data to display in the table. Should be an array of DataSourceMaterialTable<T>.
   */
  public dataSource = input<Array<DataSourceMaterialTable<T>>>([]);

  /**
   * Enables expandable rows if true.
   */
  public extensible = input(false);

  /**
   * Holds the currently expanded row for extensible tables.
   */
  public extandble$: BehaviorSubject<DataSourceMaterialTable<T> | null> =
    new BehaviorSubject<DataSourceMaterialTable<T> | null>(null);

  /**
   * Show the table footer if true.
   */
  public footerShow = input(false);

  /**
   * CSS class for the footer row.
   */
  public footerMessageClass = input('');

  /**
   * Label to display in the footer.
   */
  public footerLabel = input('');

  /**
   * Enables zebra striping for rows if true.
   */
  public zebraColor = input(false);

  /**
   * The field name to use for footer aggregation (e.g., sum).
   */
  public footerColumn = input('');

  /**
   * Template for rendering new expandable row content.
   */
  public newElementExtandble = input<TemplateRef<any> | null>(null);

  /**
   * Show pagination controls if true.
   */
  public showPagination = input(false);

  /**
   * Total number of records for pagination.
   */
  public lengthPagination = input(0);

  /**
   * CSS class for the paginator.
   */
  public paginationClass = input('');

  /**
   * Available page size options for the paginator.
   */
  public pageSizeOptions = input([10, 20, 50]);

  /**
   * Number of rows per page.
   */
  public pageSize = input(10);

  /**
   * Current page index (zero-based).
   */
  public pageIndex = input(1);

  /**
   * Show footer amount aggregation if true. Type can be refined as needed.
   */
  public footerAmount = input<any>(false);

  /**
   * Show the "Add new entry" button if true.
   */
  public addedNewEntry = input(false);

  @Output() public onAddEntry: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onPaginationChange: EventEmitter<any> =
    new EventEmitter<any>();

  public filterTooltip = input(true);

  @ContentChildren(BaseColumn)
  public columnDefs: QueryList<BaseColumn> | any;

  public columnsToDispaly: string[] = [];
  public totalAmount = computed(() => {
    // totalAmount is now a computed signal
    return this.dataSource()
      .map((column: any) => {
        // Access dataSource as a signal here
        return column.model?.[this.footerColumn()] ?? 0; // Access footerColumn as a signal
      })
      .reduce((acc, value) => acc + value, 0);
  });
  private doubleColumnToDisplay: string[] = [];

  private readonly _tableState = inject(TableService);
  private readonly _columnRotate = inject(ColumnRotateService);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  protected rotates$ = this._columnRotate.rotate$.pipe(
    tap((side: string) => {
      if (side.includes('left')) {
        this.rotateColumn('left');
      } else {
        this.rotateColumn('right');
      }
    })
  );

  protected colForLaylout$ = this._tableState.columnDisplay$.pipe(
    tap((columns) => {
      this.columnsToDispaly = columns;
      this._changeDetectorRef.detectChanges();
    })
  );

  ngAfterContentInit(): void {
    this.columnsToDispaly = this.columnDefs.map(
      (resp: BaseColumn) => resp.field
    );

    try {
      const duplicate = this.columnsToDispaly.filter(
        (columnDisplay: string, index: number, self: string[]) =>
          index === self.findIndex((value: string) => value === columnDisplay)
      );
      this.doubleColumnToDisplay = [...this.columnsToDispaly];
      if (duplicate.length < this.columnsToDispaly.length) {
        throw new Error(
          'You duplicate value what you want to display, Please look in definitions at columns'
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  public ngAfterViewInit(): void {
    // totalAmount is now a computed signal, so it updates automatically.
    // We just need to push its current value to the service.
    this._tableState.pushData(this.totalAmount()); // Call totalAmount as a signal
    this._changeDetectorRef.detectChanges();
  }


  /**
   * @description Emits an event to add a new entry to the table.
   * @return void
   */
  public addNewEntry(): void {
    this.onAddEntry.next(true);
  }


  /**
   * @description Emits a pagination change event when the page is changed.
   * @param materialPageEvent The event object from the paginator.
   * @return void
   */
  public changePage(materialPageEvent: any): void {
    this.onPaginationChange.emit(materialPageEvent);
  }


  /**
   * @description Handles row drag-and-drop to reorder table rows.
   * @param event The drag-and-drop event containing previous and current index.
   * @return void
   */
  public drop(event: CdkDragDrop<Array<DataSourceMaterialTable<T>>>): void {
    moveItemInArray(this.dataSource(), event.previousIndex, event.currentIndex); // Access dataSource as a signal
    // Note: When moving items in a signal's array, you might need to
    // explicitly set the signal again if Angular's change detection doesn't pick it up
    // automatically after moveItemInArray. However, CdkDragDrop usually
    // works by directly modifying the array reference.
    // If you encounter issues, you might need: this.dataSource.set([...this.dataSource()]);
  }


  /**
   * @description Handles drag-and-drop to reorder table columns.
   * @param event The drag-and-drop event containing previous and current index.
   * @return void
   */
  public dropColumn(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.columnsToDispaly,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(
      this.doubleColumnToDisplay,
      event.previousIndex,
      event.currentIndex
    );
  }


  /**
   * @description Returns the header template for a given column field.
   * @param colField The field name of the column.
   * @return The header template or undefined if not found.
   */
  getHeaderTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.headerTemplate;
  }


  /**
   * @description Returns the body template for a given column field.
   * @param colField The field name of the column.
   * @return The body template or undefined if not found.
   */
  getBodyTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.bodyTemplate;
  }


  /**
   * @description Returns the footer template for a given column field.
   * @param colField The field name of the column.
   * @return The footer template or undefined if not found.
   */
  getFooterTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.footerTemplate;
  }


  /**
   * @description Returns the display name for a column header.
   * @param colField The field name of the column.
   * @return The display name or the field name if not found.
   */
  getColumnHeaderName(colField: string): string {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.name || colField;
  }


  /**
   * @description Returns the footer message for a given column field.
   * @param colField The field name of the column.
   * @return The footer message, or null if not found.
   */
  getColumnFooterMessage(colField: string): string | number | null {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.footerMessage ?? null;
  }

  private rotateColumn(side: string) {
    if (this.doubleColumnToDisplay.length <= 1) return;

    if (side === 'left') {
      this._rotateLeft();
    } else {
      this._rotateRight();
    }
    this.columnsToDispaly = [...this.doubleColumnToDisplay];
    this._columnRotate.swapColumn(this.doubleColumnToDisplay);
  }

  private _rotateLeft() {
    const firstColumn = this.doubleColumnToDisplay.shift();
    if (firstColumn) {
      this.doubleColumnToDisplay.push(firstColumn);
    }
  }

  private _rotateRight() {
    const lastColumn = this.doubleColumnToDisplay.pop();
    if (lastColumn) {
      this.doubleColumnToDisplay.unshift(lastColumn);
    }
  }
}
