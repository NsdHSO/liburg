import { provideHttpClient } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { GlobalErrorHandleService } from './icon-core.service';


/**
 * @description Angular module that provides icon registry setup and global error handling for the application.
 */
@NgModule({
  providers: [
    provideHttpClient(),
    provideRouter([]),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandleService,
    },
  ],
})
export class IconCoreModule {
  /**
   * @description Registers SVG icon sets for different namespaces using Angular Material's icon registry.
   * @param _domSanitizer Angular DomSanitizer for safe resource URLs.
   * @param _matIconRegistry Angular Material icon registry for registering icon sets.
   */
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
