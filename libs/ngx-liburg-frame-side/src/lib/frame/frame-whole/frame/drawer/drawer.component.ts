import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

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
  @Input() opened = false;
  @Input() mode: 'over' | 'push' | 'side' = 'over';
  @Input() position: 'start' | 'end' = 'end';
  @Input() width = '300px';

  @Output() openedChange = new EventEmitter<boolean>();

  toggleDrawer() {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
  }

  closeDrawer() {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }
}
