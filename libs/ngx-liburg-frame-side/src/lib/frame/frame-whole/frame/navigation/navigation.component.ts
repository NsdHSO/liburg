import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FrameService } from '@ngx-liburg-frame-side';

@Component({
  selector: 'liburg-navigation',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatIcon,
    NgClass,
    RouterLink,
    RouterLinkActive,
    MatIcon,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input()
  public navData: FrameService | any;
  @Input()
  public collapsed!: boolean;
  @Input()
  public subToggle: boolean | undefined;
  @Input()
  public indexShows: number = 0;
  @Output()
  toggle = new EventEmitter<any>();

  setSubToggle($event: any) {
    this.toggle.emit($event);
  }
}
