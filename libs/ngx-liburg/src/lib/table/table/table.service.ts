import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private readonly _amountData: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  amountData$ = this._amountData.asObservable()
  private readonly _columnDisplay: Subject<string[]> = new Subject<string[]>()
  columnDisplay$ = this._columnDisplay.asObservable()

  constructor(private readonly _brPoint: BreakpointObserver,
  ){
  }

  pushData(data: number){
    this._amountData.next(data)
  }

  responsive(columnsToDisplay: string[], cloneColumn: string[]){
    this._brPoint
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(() => {
        if ( this._brPoint.isMatched(
          Breakpoints.XSmall) ) {
          columnsToDisplay = cloneColumn.filter(
            (item, index) => {
              return (
                index <= 1 || index === cloneColumn.length - 1
              );
            },
          );
        } else if ( this._brPoint.isMatched(
          Breakpoints.Small) ) {
          columnsToDisplay = cloneColumn.filter(
            (item, index) => {
              return (
                index <= 2 || index === cloneColumn.length - 1
              );
            },
          );
        } else if ( this._brPoint.isMatched(
          Breakpoints.Medium) ) {
          columnsToDisplay = cloneColumn.filter(
            (item, index) => {
              return (
                index <= 3 || index === cloneColumn.length - 1
              );
            },
          );
        } else if ( this._brPoint.isMatched(
          Breakpoints.Large) ) {
          columnsToDisplay = cloneColumn.filter(
            (item, index) => {
              return (
                index <= 5 || index === cloneColumn.length - 1
              );
            },
          );
        } else if ( this._brPoint.isMatched(
          Breakpoints.XLarge) ) {
          columnsToDisplay = cloneColumn.filter(
            (item, index) => {
              return (
                index >= 0
              );
            },
          );
        }
        this._columnDisplay.next(columnsToDisplay)
      });
  }
}
