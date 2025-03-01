import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BaseColumn } from '../../base-column';
import { OverlayRef } from '@angular/cdk/overlay';
import {ElixTooltipService} from "./elix-tooltip.service";
import {DataSourceMaterialTable} from "../../table/table.component";

@Component({
  selector: 'elix-column-area-text',
  templateUrl: './column-area-text.component.html',
  styleUrls: ['./column-area-text.component.scss'],
  providers: [{ provide: BaseColumn, useExisting: ColumnAreaTextComponent }],
})
export class ColumnAreaTextComponent extends BaseColumn {
  value: boolean = false;
  vars: any;
  // @ts-ignore
  @ViewChild('tooltipRef') tooltipRef: TemplateRef<any>;
  // @ts-ignore
  tooltipOverlay: OverlayRef;
  width: number = 400;

  constructor(

    private _elixTooltip: ElixTooltipService,
    private _viewContainer: ViewContainerRef
  ) {
    super();
  }

  openTooltip(element: HTMLElement, model: DataSourceMaterialTable<any>) {
    this.value = false;
    if (!this.tooltipOverlay || !this.tooltipOverlay.hasAttached()) {
      this.vars = model.model[this.field];
      this.tooltipOverlay = this._elixTooltip.initTooltip(
        this.tooltipRef,
        this._viewContainer,
        element,
        this.width
      );
      // @ts-ignore
      this.tooltipOverlay.backdropElement.classList.add('cursor-pointer');
    }
  }

  closeTooltip() {
    this.value = true;
    this.tooltipOverlay.detach();
    this.tooltipOverlay.dispose();
  }

  doubleClick(element: DataSourceMaterialTable<any>, value: boolean) {
    this.value = true;
    element.editable = value;
  }
}
