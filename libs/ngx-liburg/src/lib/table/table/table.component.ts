import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter, inject, input,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseColumn } from '../base-column';
import { ColumnRotateService } from "../columns/service/column-rotate.service";
import { TableService } from "./table.service";
import { AsyncPipe, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterAmountComponent } from '../components/footer-amount/footer-amount.component';

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
  imports: [
    MatTableModule,
    CdkDropList,
    CdkDrag,
    AsyncPipe,
    MatPaginatorModule,
    MatIconModule,
    NgIf,
    NgTemplateOutlet,
    FooterAmountComponent,
  ],
})
export class TableComponent<T> implements AfterViewInit {
  @Input()
  // @ts-ignore
  public dataSource: Array<DataSourceMaterialTable<T>>;

  @Input()
  public extensible: boolean = false;

  @Input()
  // @ts-ignore
  public extandble$: BehaviorSubject<DataSourceMaterialTable<T> | null>;

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
  // @ts-ignore
  public newElementExtandble: TemplateRef<any>;

  // flag about if we want to show pagination
  @Input()
  public showPagination: boolean = false;

  // numberOf Entry
  @Input()
  // @ts-ignore
  public lenghtPagination: number;

  @Input()
  // @ts-ignore
  public paginationClass: string;


  /**
   * Is an array of allowed values.
   */
  public pageSizeOptions = input([10, 20, 50])
  /**
   * Page Size has a default value but can be configured elsewhere.
   */
  public pageSize = input(10)

  /**
   * Page Index sets the current page number.
   */
  public pageIndex = input(1)

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

  @Output() public onPaginationChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  @Input()
  filterTooltip: boolean = true;
  // this is where the magic happens:
  // @ts-ignore
  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ContentChildren(BaseColumn)
  public columnDefs: QueryList<BaseColumn> | any;
  public columnsToDispaly: string[] = [];
  public totalAmount: number = 0;
  private doubleColumnToDisplay: string[] = [];

  /**
   * Observable that listens to column rotation events and updates the displayed columns accordingly.
   * Rotates columns left or right based on the emitted value from the ColumnRotateService.
   */
  protected rotates$ = this._columnRotate.rotate$
    .pipe(
      tap((side: string) => {
        if (side.includes('left')) {
          this.rotateColumn('left');
        } else {
          this.rotateColumn('right');
        }
      })
    );

  /**
   * Observable that listens to layout column changes from the TableService.
   * Updates the columnsToDispaly array and triggers change detection.
   */
  protected colForLaylout$ = this._tableState.columnDisplay$
    .pipe(
      tap((columns) => {
        this.columnsToDispaly = columns;
        this._changeDetectorRef.detectChanges();
      })
    );

  /**
   * Observable that triggers the responsive column logic in the TableService.
   * Ensures the table layout adapts to screen size and column configuration.
   */
  protected colResponse$ = this._tableState.responsive(
    this.columnsToDispaly,
    this.doubleColumnToDisplay
  );



  public ngAfterViewInit(): void {
    this.columnsToDispaly = this.columnDefs.map(
      (resp: BaseColumn) => resp.columnDef.name
    );
    this.columnDefs
      .map((resp: BaseColumn) => resp.columnDef)
      .forEach((rep: MatColumnDef) => this.table.addColumnDef(rep));
    this.totalAmount = this.dataSource
      .map((column: any) => {
        return column.model[this.footerColumn];
      })
      .reduce((acc, value) => acc + value, 0);

    try {
      const duplicate = this.columnsToDispaly.filter(
        (columnDisplay: string, index: number, self: string[]) =>
          index === self.findIndex((value: string) => value === columnDisplay)
      );
      this.doubleColumnToDisplay = this.columnsToDispaly;
      if (duplicate.length < this.columnsToDispaly.length) {
        throw new Error(
          'You duplicate value what you want to display, Please look in definitions at columns'
        );
      }
    } catch (err) {
      console.error(err);
    }
    this._tableState.pushData(this.totalAmount);
    this._changeDetectorRef.detectChanges();
  }

  public addNewEntry() {
    this.onAddEntry.next(true);
  }

  public changePage(event: PageEvent) {
    this.onPaginationChange.emit(event);
  }

  public drop(event: CdkDragDrop<Array<DataSourceMaterialTable<T>>>): void {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  rowOdd(row: DataSourceMaterialTable<T>) {
    return this.dataSource.indexOf(row);
  }

  private rotateColumn(side: string) {
    if (side === 'left') {
      this._rotateLeft();
    } else {
      this._rotateRight();
    }
    this.columnsToDispaly = [
      ...this.doubleColumnToDisplay.slice(0, this.columnsToDispaly.length - 1),
      'action',
    ];
  }

  private _rotateLeft() {
    const intermediateColumn = this.doubleColumnToDisplay[0];
    this.doubleColumnToDisplay.forEach((column, index) => {
      this.doubleColumnToDisplay[index] = this.doubleColumnToDisplay[index + 1];
    });
    this.doubleColumnToDisplay[this.doubleColumnToDisplay.length - 1] =
      intermediateColumn;
    this._columnRotate.swapColumn(this.doubleColumnToDisplay);
  }

  private _rotateRight() {
    const intermediateColumn =
      this.doubleColumnToDisplay[this.doubleColumnToDisplay.length - 2];
    for (let i = this.doubleColumnToDisplay.length - 2; i > 0; i--) {
      this.doubleColumnToDisplay[i] = this.doubleColumnToDisplay[i - 1];
    }
    this.doubleColumnToDisplay[0] = intermediateColumn;
  }
}
