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
  ChangeDetectionStrategy, // Consider OnPush for performance with signals
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  input, // Import 'input' for signal inputs
  // Input, // Remove @Input()
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  computed, // Import 'computed' for derived signals
  // effect, // Consider 'effect' for side effects if needed
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BaseColumn } from '../base-column';
import { ColumnRotateService } from '../columns/service/column-rotate.service';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { FooterAmountComponent } from '../components/footer-amount/footer-amount.component';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // Consider OnPush for signal-based components
})
export class TableComponent<T>
  implements AfterViewInit, AfterContentInit
{
  // Changed @Input() to signal inputs
  public dataSource = input<Array<DataSourceMaterialTable<T>>>([]);
  public extensible = input(false);
  public extandble$: BehaviorSubject<DataSourceMaterialTable<T> | null> =
    new BehaviorSubject<DataSourceMaterialTable<T> | null>(null); // Keeping as BehaviorSubject for now
  public footerShow = input(false);
  public footerMessageClass = input('');
  public footerLabel = input('');
  public zebraColor = input(false);
  public footerColumn = input('');
  public newElementExtandble = input<TemplateRef<any> | null> (null); // Made required as it seems critical
  public showPagination = input(false);
  public lengthPagination = input(0);
  public paginationClass = input('');
  public pageSizeOptions = input([10, 20, 50]);
  public pageSize = input(10);
  public pageIndex = input(1);
  public footerAmount = input<any>(false); // Type `any` might need refinement
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

  public addNewEntry() {
    this.onAddEntry.next(true);
  }

  public changePage(materialPageEvent: any): void {
    this.onPaginationChange.emit(materialPageEvent);
  }

  public drop(event: CdkDragDrop<Array<DataSourceMaterialTable<T>>>): void {
    moveItemInArray(this.dataSource(), event.previousIndex, event.currentIndex); // Access dataSource as a signal
    // Note: When moving items in a signal's array, you might need to
    // explicitly set the signal again if Angular's change detection doesn't pick it up
    // automatically after moveItemInArray. However, CdkDragDrop usually
    // works by directly modifying the array reference.
    // If you encounter issues, you might need: this.dataSource.set([...this.dataSource()]);
  }

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

  getHeaderTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.headerTemplate;
  }

  getBodyTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.bodyTemplate;
  }

  getFooterTemplate(colField: string): TemplateRef<any> | undefined {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.footerTemplate;
  }

  getColumnHeaderName(colField: string): string {
    const column = this.columnDefs.find(
      (c: BaseColumn) => c.field === colField
    );
    return column?.name || colField;
  }

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