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
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  input,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'; // Use Subject for onDestroy
import { takeUntil, tap } from 'rxjs/operators';
import { BaseColumn } from '../base-column'; // Assume BaseColumn is adapted for PrimeNG
import { ColumnRotateService } from '../columns/service/column-rotate.service';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FooterAmountComponent } from '../components/footer-amount/footer-amount.component';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button'; // For general buttons
import { RippleModule } from 'primeng/ripple'; // For ripple effect on buttons

export interface IActionMaterialColumn {
  // This interface can remain as is for logic
  iconClass: string;
  classCss: string;
  method: (row?: any) => void;
}

export interface DataSourceMaterialTable<T> {
  // This interface can remain as is for logic
  model: T;
  editable: boolean;
  actions: IActionMaterialColumn[];
  id?: number; // Added for dataKey in p-table
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
  standalone: true, // Enable standalone component
  imports: [
    CommonModule, // For NgIf, NgTemplateOutlet, AsyncPipe
    TableModule, // PrimeNG Table Module
    PaginatorModule, // PrimeNG Paginator (if not included in TableModule for specific version)
    ButtonModule,
    RippleModule,
    FooterAmountComponent,
  ],
})
export class TableComponent<T>
  implements AfterViewInit, AfterContentInit, OnDestroy
{
  // Implement OnDestroy
  @Input()
  public dataSource: Array<DataSourceMaterialTable<T>> = [];

  @Input()
  public extensible: boolean = false;

  @Input()
  public extandble$: BehaviorSubject<DataSourceMaterialTable<T> | null> =
    new BehaviorSubject<DataSourceMaterialTable<T> | null>(null);

  // Footer
  @Input()
  public footerShow: boolean = false;

  // class for footer
  @Input()
  public footerMessageClass: string = '';

  @Input()
  public footerLabel: string = '';

  @Input()
  public zebraColor: boolean = false;

  @Input()
  public footerColumn: string = '';

  // new table in row
  @Input()
  public newElementExtandble!: TemplateRef<any>;

  // flag about if we want to show pagination
  @Input()
  public showPagination: boolean = false;

  // numberOf Entry
  @Input()
  public lenghtPagination: number = 0;

  @Input()
  public paginationClass: string = '';

  /**
   * Is an array of allowed values.
   */
  public pageSizeOptions = input([10, 20, 50]);
  /**
   * Page Size has a default value but can be configured elsewhere.
   */
  public pageSize = input(10);

  /**
   * Page Index sets the current page number.
   */
  public pageIndex = input(1);

  /**
   * TableService instance for managing table state and responsive behavior.
   */
  private readonly _tableState = inject(TableService);

  /**
   * ColumnRotateService instance for handling column rotation logic.
   */
  private readonly _columnRotate = inject(ColumnRotateService);

  /**
   * ChangeDetectorRef instance for triggering change detection.
   */
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  /**
   *
   */
  @Input()
  footerAmount: any = false;

  @Input()
  public addedNewEntry = false;

  @Output() public onAddEntry: EventEmitter<any> = new EventEmitter<any>();

  @Output() public onPaginationChange: EventEmitter<any> = // Change type to any for PrimeNG PageEvent
    new EventEmitter<any>();

  @Input()
  filterTooltip: boolean = true;

  @ContentChildren(BaseColumn)
  public columnDefs: QueryList<BaseColumn> | any;

  public columnsToDispaly: string[] = [];
  public totalAmount: number = 0;
  private doubleColumnToDisplay: string[] = [];

  private destroy$ = new Subject<void>(); // Subject for component destruction

  /**
   * Observable that listens to column rotation events and updates the displayed columns accordingly.
   * Rotates columns left or right based on the emitted value from the ColumnRotateService.
   */
  protected rotates$ = this._columnRotate.rotate$.pipe(
    tap((side: string) => {
      if (side.includes('left')) {
        this.rotateColumn('left');
      } else {
        this.rotateColumn('right');
      }
    }),
    takeUntil(this.destroy$) // Unsubscribe on destroy
  );

  /**
   * Observable that listens to layout column changes from the TableService.
   * Updates the columnsToDispaly array and triggers change detection.
   */
  protected colForLaylout$ = this._tableState.columnDisplay$.pipe(
    tap((columns) => {
      this.columnsToDispaly = columns;
      this._changeDetectorRef.detectChanges();
    }),
    takeUntil(this.destroy$) // Unsubscribe on destroy
  );

  /**
   * Observable that triggers the responsive column logic in the TableService.
   * Ensures the table layout adapts to screen size and column configuration.
   */
  protected colResponse$ = this._tableState
    .responsive(this.columnsToDispaly, this.doubleColumnToDisplay)
    .pipe(takeUntil(this.destroy$)); // Unsubscribe on destroy

  ngAfterContentInit(): void {
    // This is where columnDefs are available
    this.columnsToDispaly = this.columnDefs.map(
      (resp: BaseColumn) => resp.field
    ); // Use `field` for PrimeNG column identification

    try {
      const duplicate = this.columnsToDispaly.filter(
        (columnDisplay: string, index: number, self: string[]) =>
          index === self.findIndex((value: string) => value === columnDisplay)
      );
      this.doubleColumnToDisplay = [...this.columnsToDispaly]; // Make a copy
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
    // Moved some logic to AfterContentInit where columnDefs are ready

    this.totalAmount = this.dataSource
      .map((column: any) => {
        return column.model?.[this.footerColumn] ?? 0; // Use optional chaining and nullish coalescing
      })
      .reduce((acc, value) => acc + value, 0);

    this._tableState.pushData(this.totalAmount);
    this._changeDetectorRef.detectChanges(); // Ensure changes are detected
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addNewEntry() {
    this.onAddEntry.next(true);
  }

  public changePage(event: any) {
    // PrimeNG Paginator event object
    // PrimeNG Paginator event structure:
    // { first: 0, rows: 10, page: 0, pageCount: 1 }
    this.onPaginationChange.emit(event);
  }

  public drop(event: CdkDragDrop<Array<DataSourceMaterialTable<T>>>): void {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    // In PrimeNG, simply updating the array should suffice for rendering.
    // this.table.renderRows(); // Not needed for PrimeNG
  }

  public dropColumn(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.columnsToDispaly,
      event.previousIndex,
      event.currentIndex
    );
    // You might also want to reorder `doubleColumnToDisplay` if it's used for rotation
    moveItemInArray(
      this.doubleColumnToDisplay,
      event.previousIndex,
      event.currentIndex
    );
    // PrimeNG table will automatically re-render based on columnsToDispaly
  }

  // Helper to get header template from content projected columns
  getHeaderTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.headerTemplate;
  }

  // Helper to get body template from content projected columns
  getBodyTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.bodyTemplate;
  }

  // Helper to get footer template from content projected columns
  getFooterTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.footerTemplate;
  }

  // Helper to get column header name for default template
  getColumnHeaderName(colField: string): string {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.name || colField;
  }

  // Helper to get column footer message for default template
  getColumnFooterMessage(colField: string): string | number | null {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.footerMessage ?? null;
  }

  private rotateColumn(side: string) {
    if (this.doubleColumnToDisplay.length <= 1) return; // Prevent rotation on single/no column

    if (side === 'left') {
      this._rotateLeft();
    } else {
      this._rotateRight();
    }
    // Update columnsToDispaly based on the rotated doubleColumnToDisplay
    // Ensure 'action' or any fixed columns are handled if they exist in your logic
    // This logic might need adjustment based on how 'action' column is managed
    this.columnsToDispaly = [...this.doubleColumnToDisplay];
    this._columnRotate.swapColumn(this.doubleColumnToDisplay); // Notify service of new order
  }

  private _rotateLeft() {
    const firstColumn = this.doubleColumnToDisplay.shift(); // Remove first element
    if (firstColumn) {
      this.doubleColumnToDisplay.push(firstColumn); // Add to the end
    }
  }

  private _rotateRight() {
    const lastColumn = this.doubleColumnToDisplay.pop(); // Remove last element
    if (lastColumn) {
      this.doubleColumnToDisplay.unshift(lastColumn); // Add to the beginning
    }
  }
}
