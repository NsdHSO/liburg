import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Service to control the state of the drawer component
 * This allows any component to open or close the drawer without direct reference
 */
@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  // Signal to track the open state of the drawer
  private _isOpen = signal(false);

  private _drawerAction = new Subject<boolean>();

  // Public read-only access to the drawer state
  public isOpen = this._isOpen.asReadonly();
  public drawerAction = this._drawerAction.asObservable();
  private router = inject(Router);
  routeNavigationOpenDrawer = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    tap((event: NavigationEnd) => {
      // Check if the URL contains a drawer outlet segment
      if (event.url.includes('(drawer:')) {
        this.open();
      }
    })
  );

  /**
   * Open the drawer
   */
  open(): void {
    this._isOpen.set(true);
  }

  /**
   * Close the drawer and clear the drawer outlet from the URL
   */
  close(): void {
    this._isOpen.set(false);

    // Clear the drawer outlet from the URL
    // We navigate to the same URL but without the drawer outlet
    // This is done by setting the drawer outlet to null
    this.router.navigate([{ outlets: { drawer: null } }]);
  }

  /**
   * Toggle the open state of the drawer
   */
  toggle(): void {
    this._isOpen.update((state) => !state);
  }
}
