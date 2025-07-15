import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-base',
  template: '', // Empty template, as this is an abstract base
})
export abstract class BaseColumn {
  // PrimeNG does not use MatColumnDef, but we keep 'field' and 'name'

  /**
   * @description Display name for the column header.
   */
  @Input()
  public name: string = '';


  /**
   * @description The data property name for this column.
   */
  @Input()
  public field: string = '';


  /**
   * @description CSS class for the column.
   */
  @Input()
  public className: string = '';


  /**
   * @description CSS class for icons in action columns or headers.
   */
  @Input()
  public iconClass: string = '';


  /**
   * @description Flag indicating if the row is editable.
   */
  @Input()
  public editRow: boolean = false;


  /**
   * @description Message to display in the footer cell for this column.
   */
  @Input()
  public footerMessage: string | number | null = null;


  /**
   * @description Template reference for the column header.
   */
  @Input()
  public headerTemplate?: TemplateRef<any>;


  /**
   * @description Template reference for the column body.
   */
  @Input()
  public bodyTemplate?: TemplateRef<any>;


  /**
   * @description Template reference for the column footer.
   */
  @Input()
  public footerTemplate?: TemplateRef<any>;
}
