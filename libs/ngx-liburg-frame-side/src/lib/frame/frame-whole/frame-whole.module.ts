import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FrameService, RouterConfig } from './frame-service';

@NgModule()
export class FrameWholeModule {
  constructor(@Optional() @SkipSelf() parentModule?: FrameWholeModule) {
    // Prevent multiple imports of this module
    if (parentModule) {
      throw new Error(
        'FrameWholeModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(config: RouterConfig): ModuleWithProviders<FrameWholeModule> {
    return {
      ngModule: FrameWholeModule,
      providers: [
        {
          provide: FrameService,
          useValue: config,
        },
      ],
    };
  }
}
