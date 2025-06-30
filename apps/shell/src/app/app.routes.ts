import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo',
  },
  {
    path: 'demo',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/demo/table-demo.component').then(
            (c) => c.default
          ),
      },
    ],
  },
  {
    // Define routes for components to be loaded in the drawer outlet
    path: 'table-sidebar',
    outlet: 'drawer',
    loadComponent: () =>
      import('./components/sidebar/demo-sidebar.component').then(
        (c) => c.default
      ),
  },
  {
    path: 'help-sidebar',
    outlet: 'drawer',
    loadComponent: () =>
      import('./components/sidebar/demo-sidebar.component').then(
        (c) => c.default
      ),
  },
  {
    path: 'table',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/table/playground_table').then((c) => c),
      }
    ],
  },
  {
    path: 'calendar',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/calendar/playground_table').then((c) => c),
      },
    ],
  },
];
