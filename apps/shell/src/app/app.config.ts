import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation, withViewTransitions
} from '@angular/router';
import { appRoutes } from './app.routes';
import { FrameWholeModule, RouterConfig } from '@ngx-liburg-frame-side';
import { IconCoreModule } from '@ngx-liburg-icon';

export const CONFIG_MAIN = Object.freeze({
  routerDataConfig: [
    {
      path: 'table',
      icon: 'fa_solid:gauge',
      text: 'Dashboard'
    },
    {
      path: 'calendar',
      icon: 'fa_solid:gauge',
      text: 'test',
    },
  ],
  iconApp: ''
}) as RouterConfig;
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withViewTransitions()),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
    importProvidersFrom(IconCoreModule),
  ],
};
