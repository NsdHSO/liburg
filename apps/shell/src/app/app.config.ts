import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { FrameWholeModule } from '@ngx-liburg-frame-side';

export const CONFIG_MAIN = Object.freeze(
  {
    routerDataConfig: [
      {
        path: 'driver',
        icon: 'fa_solid:gauge',
        text: 'Dashboard'
      },
      {
        path: 'calendar',
        icon: 'fa_solid:gauge',
        text: 'test'
      }
    ],
    iconApp: ''
  });
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
  ],
};
