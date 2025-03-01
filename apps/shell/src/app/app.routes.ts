import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'table',
    loadComponent: () =>
      import('./components/table/playground_table').then((c) => c),
  },
];
