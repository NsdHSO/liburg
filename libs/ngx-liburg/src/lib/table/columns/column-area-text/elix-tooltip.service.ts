import {
  Injectable,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ConnectedPosition } from '@angular/cdk/overlay';

export const configOverlay = {
  LEFT: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  } as ConnectedPosition,
  RIGHT: {
    originX: 'start',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  } as ConnectedPosition,
  TOP: {
    originX: 'start',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'top',
  } as ConnectedPosition,
  BOTTOM: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  } as ConnectedPosition,
};

@Injectable({
  providedIn: 'root',
})
export class ElixTooltipService {
  private _rendered2: Renderer2;

  constructor(
    private _overlay: Overlay,
    private _rendererFactory: RendererFactory2
  ) {
    this._rendered2 = _rendererFactory.createRenderer(null, null);
  }

  initTooltip(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
    origin?: HTMLElement | any,
    width?: number
  ) {
    const portalHost = new TemplatePortal(templateRef, viewContainerRef);

    const overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(origin)
        .withPositions([
          configOverlay.BOTTOM,
          configOverlay.TOP,
          configOverlay.LEFT,
          configOverlay.RIGHT,
        ]),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'vorkurt-tooltip',
      width: width,
    });
    this._getConfigAtArrow(overlayRef);
    overlayRef.attach(portalHost);
    overlayRef.backdropClick().subscribe(() => this.close(overlayRef));
    return overlayRef;
  }

  close(overlayRef?: any) {
    overlayRef.detach();
    overlayRef.dispose();
  }

  private _getConfigAtArrow(overlayRef: any) {
    const tooltipPosition = (
      overlayRef.getConfig()
        .positionStrategy as FlexibleConnectedPositionStrategy
    ).positions[0];
    const arrow: HTMLSpanElement = this._rendered2.createElement('span');
    arrow.classList.add('elix__arrow');
    const tooltipHeight = <number>overlayRef.getConfig().height;
    const tooltipWidth = overlayRef.getConfig().width;
    switch (tooltipPosition) {
      case configOverlay.LEFT:
        arrow.classList.add('elix__arrow-right');
        arrow.style.transform = 'rotate(230deg)';
        arrow.style.top = 'calc(50% + -6.5px)';
        arrow.style.left = 'calc(100%)';

        break;
      case configOverlay.RIGHT:
        arrow.classList.add('elix__arrow-left');

        break;
      case configOverlay.TOP:
        arrow.classList.add('elix__arrow-bottom');
        arrow.style.transform = 'rotate(135deg)';

        break;
      case configOverlay.BOTTOM:
        arrow.classList.add('elix__arrow-top');
        arrow.style.left = '50%';
        arrow.style.top = 'calc(100% + -15px)';
        arrow.style.transform = 'rotate(315deg)';
        break;
    }
    overlayRef.overlayElement.appendChild(arrow);
  }
}
