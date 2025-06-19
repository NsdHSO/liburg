import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo',
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./components/demo/table-demo.component').then((c) => c.default),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./components/table/playground_table').then((c) => c),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./components/calendar/playground_table').then((c) => c),
  },
];
