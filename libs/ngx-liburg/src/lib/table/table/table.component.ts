import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseColumn } from '../base-column';
import { ColumnRotateService } from "../columns/service/column-rotate.service";
import { TableService } from "./table.service";

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
  styleUrls: [ './table.component.scss' ],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0'
        })),
      state(
        'expanded',
        style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate(
          '225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> implements AfterViewInit, OnDestroy {
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
  // @ts-ignore
  // after the <ng-content> has been initialized, the column definitions are available.
  public columnDefs: QueryList<BaseColumn>;
  public columnsToDispaly: string[] = [];

  private doubleColumnToDisplay: string[] = [];
  // for avoid memory leak
  private _destroyed = new Subject<void>();

  constructor(
    private readonly _tableState: TableService,
    private readonly _columnRotate: ColumnRotateService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ){
  }

  public ngAfterViewInit(): void{
    this.columnsToDispaly = this.columnDefs.map(
      (resp: BaseColumn) => resp.columnDef.name,
    );
    this.columnDefs
      .map((resp: BaseColumn) => resp.columnDef)
      .forEach((rep: MatColumnDef) => this.table.addColumnDef(
        rep));
    this._columnRotate.rotate$.pipe(takeUntil(this._destroyed)).subscribe((side: string) => {
      if (
        side.includes('left')
      ) {
        this.rotateColumn('left');

      } else {
        this.rotateColumn('right');
      }
    })
    try {
      const duplicate = this.columnsToDispaly.filter(
        (
          columnDisplay: string,
          index: number,
          self: string[]) =>
          index === self.findIndex((value: string) => value === columnDisplay),
      );
      this.doubleColumnToDisplay = this.columnsToDispaly;
      this._setColumnForLayout();
      if ( duplicate.length < this.columnsToDispaly.length ) {
        throw new Error(
          'You duplicate value what you want to display, Please look in definitions at columns',
        );
      }
    } catch ( err ) {
      console.error(err);
    }
    this._changeDetectorRef.detectChanges();
  }

  public addNewEntry(){
    this.onAddEntry.next(true);
  }

  public changePage(event: PageEvent){
    this.onPaginationChange.emit(event);
  }

  public drop(event: CdkDragDrop<Array<DataSourceMaterialTable<T>>>): void{
    moveItemInArray(
      this.dataSource,
      event.previousIndex,
      event.currentIndex);
    this.table.renderRows();
  }

  private rotateColumn(side: string){
    if ( side === 'left' ) {
      this._rotateLeft();
    } else {
      this._rotateRight();
    }
    this.columnsToDispaly = [ ...this.doubleColumnToDisplay.slice(
      0,
      this.columnsToDispaly.length - 1), 'action' ]
  }

  private _rotateLeft(){
    const intermediateColumn = this.doubleColumnToDisplay[ 0 ]
    this.doubleColumnToDisplay.forEach((column, index) => {
      this.doubleColumnToDisplay[ index ] = this.doubleColumnToDisplay[ index + 1 ]
    })
    this.doubleColumnToDisplay[ this.doubleColumnToDisplay.length - 1 ] = intermediateColumn
    this._columnRotate.swapColumn(this.doubleColumnToDisplay);
  }

  private _rotateRight(){
    const intermediateColumn = this.doubleColumnToDisplay[ this.doubleColumnToDisplay.length - 2 ]
    for ( let i = this.doubleColumnToDisplay.length - 2; i > 0; i-- ) {
      this.doubleColumnToDisplay[ i ] = this.doubleColumnToDisplay[ i - 1 ]
    }
    this.doubleColumnToDisplay[ 0 ] = intermediateColumn
  }


  private _setColumnForLayout(){
    this._tableState.responsive(this.columnsToDispaly, this.doubleColumnToDisplay)
    this._tableState.columnDisplay$.pipe(takeUntil(this._destroyed)).subscribe(
      columns => {
        this.columnsToDispaly = columns
      })
  }

  public ngOnDestroy(){
    this._destroyed.next();
    this._destroyed.complete();
  }
}
