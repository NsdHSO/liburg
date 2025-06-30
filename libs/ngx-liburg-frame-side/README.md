# ngx-liburg-frame-side

A flexible Angular layout framework component that provides a customizable application frame with side navigation, drawer support, and routing integration. Current version: 19.0.13

## Overview

ngx-liburg-frame-side is a standalone Angular component library that provides a complete UI framework for building modern web applications with side navigation and drawer functionality. It's built with Angular Material and designed to be highly customizable and responsive.

## Features

- **Responsive Side Navigation**: Collapsible side navigation with support for nested routes
- **Dynamic Drawer System**: Configurable drawer that can be opened from any component
- **Router Integration**: Seamlessly integrates with Angular Router
- **Customizable Styling**: Supports custom theming with background inheritance
- **Angular Material Integration**: Built with Angular Material components

## Recent Changes

### Version 19.0.13
- Added comprehensive documentation for drawer outlet usage
- Improved examples for router integration
- Added detailed instructions for passing data to drawer components

### Version 19.0.12
- Added background inheritance support throughout the component hierarchy
- Removed hardcoded background colors in favor of CSS inheritance
- Enhanced component styling for better theme integration

### Version 19.0.11
- Performance improvements
- Code cleanup and optimizations

### Earlier updates
- Added close (X) button for drawer component
- Fixed z-index issues in the drawer header
- Improved drawer service for better state management

## Installation

```bash
npm install ngx-liburg-frame-side
```

## Usage

```typescript
// Import the module in your app.module.ts
import { FrameWholeModule } from 'ngx-liburg-frame-side';

@NgModule({
  imports: [
    // ...
    FrameWholeModule
  ],
})
export class AppModule {}
```

Then in your component template:

```html
<ngx-frame-side></ngx-frame-side>
```

## Using the Drawer with Router Outlets

The ngx-liburg-frame-side library provides a powerful drawer component that uses Angular's named router outlets for dynamic content loading. This approach allows you to load different components into the drawer without direct references.

### 1. Configure Routes for Drawer

First, define routes with the 'drawer' outlet in your routing configuration:

```typescript
// app.routes.ts
export const appRoutes: Route[] = [
  // Your regular routes
  { 
    path: 'home', 
    component: HomeComponent 
  },
  
  // Drawer outlet routes
  {
    path: 'details-panel',
    outlet: 'drawer',  // This is the key - specifying the outlet name
    component: DetailsPanelComponent
  },
  {
    path: 'settings-panel',
    outlet: 'drawer',
    component: SettingsPanelComponent
  }
];
```

### 2. Open Content in the Drawer

Use the Router to navigate to a drawer outlet route from any component:

```typescript
import { Router } from '@angular/router';
import { DrawerService } from 'ngx-liburg-frame-side';

@Component({
  /* ... */
})
export class MyComponent {
  constructor(
    private router: Router,
    private drawerService: DrawerService  // Optional - normally not needed
  ) {}
  
  openDetailsPanel() {
    // Navigate to load the details-panel component in the drawer outlet
    this.router.navigate([{ outlets: { drawer: ['details-panel'] } }]);
    
    // The drawer will open automatically via the router event listener in DrawerService
    // No need to call drawerService.open() manually
  }
  
  // To open with additional route parameters
  openDetailsWithId(id: string) {
    this.router.navigate([{ outlets: { drawer: ['details-panel', id] } }]);
  }
}
```

### 3. Close the Drawer

The drawer can be closed either by:

1. Using the X button in the drawer (built-in)
2. Clicking the backdrop (built-in)
3. Programmatically using the DrawerService:

```typescript
import { DrawerService } from 'ngx-liburg-frame-side';

@Component({
  /* ... */
})
export class MyComponent {
  constructor(private drawerService: DrawerService) {}
  
  closeDrawer() {
    this.drawerService.close();
    // This will both close the drawer and clear the router outlet
  }
}
```

### 4. Passing Data to Drawer Components

You can pass data to drawer components using:

1. Route parameters:
```typescript
// Navigate with parameters
this.router.navigate([{ outlets: { drawer: ['details-panel', itemId] } }]);

// Access in the component
export class DetailsPanelComponent {
  itemId: string;
  
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
    });
  }
}
```

2. Query parameters:
```typescript
// Navigate with query parameters
this.router.navigate(
  [{ outlets: { drawer: ['details-panel'] } }],
  { queryParams: { source: 'dashboard', filter: 'active' } }
);
```

## Running unit tests

Run `nx test ngx-liburg-frame-side` to execute the unit tests.
