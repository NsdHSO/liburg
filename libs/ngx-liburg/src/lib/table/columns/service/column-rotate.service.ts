import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnRotateService {

  private readonly _rotate: Subject<string> = new Subject<string>();
  rotate$ = this._rotate.asObservable();

  setSide(position: string){
    this._rotate.next( position)
  }
  public swapColumn(doubleColumnToDisplay: string[]){
    const temporallyIndex = doubleColumnToDisplay[ doubleColumnToDisplay.length - 1 ]
    doubleColumnToDisplay[ doubleColumnToDisplay.length - 1 ] = doubleColumnToDisplay[ doubleColumnToDisplay.length - 2 ]
    doubleColumnToDisplay[ doubleColumnToDisplay.length - 2 ] = temporallyIndex
  }
}
