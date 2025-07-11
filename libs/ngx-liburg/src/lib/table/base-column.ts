import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-base',
  template: '', // Empty template, as this is an abstract base
})
export abstract class BaseColumn {
  // PrimeNG does not use MatColumnDef, but we keep 'field' and 'name'
  @Input()
  public name: string = ''; // Display name for the column header

  @Input()
  public field: string = ''; // The data property name

  @Input()
  public className: string = ''; // CSS class for the column

  @Input()
  public iconClass: string = ''; // For action columns or icons in headers

  @Input()
  public editRow: boolean = false; // Flag for editable rows

  @Input()
  public footerMessage: string | number | null = null; // Message for the footer cell

  // New: TemplateRefs for PrimeNG column definitions
  @Input()
  public headerTemplate?: TemplateRef<any>;

  @Input()
  public bodyTemplate?: TemplateRef<any>;

  @Input()
  public footerTemplate?: TemplateRef<any>;
}
