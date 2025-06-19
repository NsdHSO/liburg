import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameComponent, FrameWholeModule } from '@ngx-liburg-frame-side';
import { IconCoreModule } from '@ngx-liburg-icon';

@Component({
    imports: [IconCoreModule, FrameComponent, RouterModule],
    selector: 'liburg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';
}
