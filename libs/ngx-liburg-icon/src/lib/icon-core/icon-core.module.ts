import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GlobalErrorHandleService } from './icon-core.service';

@NgModule({
  imports: [HttpClientModule, RouterModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandleService,
    },
  ],
})
export class IconCoreModule {
  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry
  ) {
    this._matIconRegistry.addSvgIconSetInNamespace(
      'fa_brands',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/svgs/brands.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'fa_regular',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/svgs/regular.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'fa_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/svgs/solid.svg'
      )
    );
  }
}
