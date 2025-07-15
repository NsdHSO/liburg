import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'liburg-demo-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule],
  template: `
    <div class="sidebar-container">
      <h2>Demo Options</h2>
      <mat-nav-list>
        <a mat-list-item>Option 1</a>
        <a mat-list-item>Option 2</a>
        <a mat-list-item>Option 3</a>
      </mat-nav-list>
    </div>
  `,
  styles: [
    `
      .sidebar-container {
        padding: 16px;
      }
      h2 {
        margin-bottom: 16px;
      }
    `,
  ],
})
export default class DemoSidebarComponent {}
