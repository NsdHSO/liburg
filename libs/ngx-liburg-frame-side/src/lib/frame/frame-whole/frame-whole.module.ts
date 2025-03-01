import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import {MatIconModule} from "@angular/material/icon";
import {FrameService, RouterConfig} from "./frame-service";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    FrameComponent,
      ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    FrameComponent
  ]
})
export class FrameWholeModule {

  constructor(@Optional() @SkipSelf() parentModule?: FrameWholeModule) {}

  static forRoot(config: RouterConfig) : ModuleWithProviders<FrameWholeModule>{
    return {
      ngModule: FrameWholeModule,
      providers:[
        {
          provide:FrameService, useValue: config
        }
      ]
    }
  }

}
