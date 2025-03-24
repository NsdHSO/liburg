import { Component, Input, ViewChild } from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'app-base',
  template: '',
})
export abstract class BaseColumn {
  @ViewChild(MatColumnDef)
  // @ts-ignore
  public columnDef: MatColumnDef;

  @Input()
  // @ts-ignore
  public name: string;

  @Input()
  // @ts-ignore
  public field: string;

  @Input()
  // @ts-ignore
  public className: string;

  @Input()
  // @ts-ignore
  public iconClass: string;

  @Input()
  public editRow: boolean = false;

  @Input()
  // @ts-ignore
  public footerMessage: string | number | null;
}
