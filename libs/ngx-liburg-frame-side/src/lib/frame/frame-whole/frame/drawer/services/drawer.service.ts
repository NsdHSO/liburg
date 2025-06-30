import { Injectable, signal } from '@angular/core';

/**
 * Service to control the state of the drawer component
 * This allows any component to open or close the drawer without direct reference
 */
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  // Signal to track the open state of the drawer
  private _isOpen = signal(false);
  
  // Public read-only access to the drawer state
  public isOpen = this._isOpen.asReadonly();
  
  constructor() {}
  
  /**
   * Open the drawer
   */
  open(): void {
    this._isOpen.set(true);
  }
  
  /**
   * Close the drawer
   */
  close(): void {
    this._isOpen.set(false);
  }
  
  /**
   * Toggle the open state of the drawer
   */
  toggle(): void {
    this._isOpen.update(state => !state);
  }
}
