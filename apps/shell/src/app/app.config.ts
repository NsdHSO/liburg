import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation, withViewTransitions
} from '@angular/router';
import { appRoutes } from './app.routes';
import { FrameWholeModule, RouterConfig } from '@ngx-liburg-frame-side';
import { IconCoreModule } from '@ngx-liburg-icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

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
      text: 'Calendar',
    },
    {
      path: 'demo',
      icon: 'fa_solid:D',
      text: 'Demo',
    }
  ],
  iconApp: ''
}) as RouterConfig;
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withViewTransitions()),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
    importProvidersFrom(IconCoreModule),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ],
};
