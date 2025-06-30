import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'liburg-drawer',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @Input() set opened(value: boolean) {
    if (value !== this._opened) {
      this._opened = value;
      // Update the service when the input property changes
      if (value) {
        this.drawerService.open();
      } else {
        this.drawerService.close();
      }
    }
  }

  get opened(): boolean {
    return this._opened;
  }

  private _opened = false;
  @Input() mode: 'over' | 'push' | 'side' = 'over';
  @Input() position: 'start' | 'end' = 'end';
  @Input() width = '50%';

  @Output() openedChange = new EventEmitter<boolean>();

  protected drawerService = inject(DrawerService);

  toggleDrawer() {
    this.drawerService.toggle();
  }

  closeDrawer() {
    this.drawerService.close();
  }

  /**
   * Handle backdrop click event
   * Closes the drawer and clears the outlet from URL
   */
  onBackdropClick() {
    this.drawerService.close();
  }

  constructor() {
    // Use Angular signal effect to respond to drawer service state changes
    effect(() => {
      const isOpen = this.drawerService.isOpen();
      if (this.opened !== isOpen) {
        this.opened = isOpen;
        this.openedChange.emit(this.opened);
      }
    });
  }
}
