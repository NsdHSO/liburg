import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import *  as RouterData from '../frame-service';
import { FrameService } from '../frame-service';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ngx-frame-side',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatIcon,
    RouterLinkActive,
    RouterOutlet,
    NgClass,
    AsyncPipe,
  ],
})
export class FrameComponent {
  public navData: FrameService | any;

  public collapsed: boolean;

  public subToggle: boolean | undefined;

  public indexShows: number = 0;

  private navDataIndex: number = 0;

  takeDataFromOutsiders;

  constructor(
    private _frameService: RouterData.FrameService,
    private _router: Router
  ) {
    this.navData = _frameService;
    this.collapsed = false;
    this.takeDataFromOutsiders = this._router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url.split('/')[1]),
      tap((navigationRoute) => {
        this.navData.routerDataConfig.forEach((route: RouterData.Router) => {
          if (route.subRouter) {
            route.subRouter?.forEach(
              (subRoute: RouterData.Router, index: number) => {
                if (subRoute.path === navigationRoute) {
                  this.navDataIndex = index;
                  this.subToggle = true;
                }
              }
            );
          }
        });
      })
    );
  }

  setSubToggle(index: number) {
    if (index == this.navDataIndex) {
      this.subToggle = true;
      this.indexShows = 0;
    } else if (this.subToggle) {
      this.subToggle = true;
      this.indexShows = index;
    }
  }
}
