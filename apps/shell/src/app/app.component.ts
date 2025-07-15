import { Component } from '@angular/core';
import { FrameComponent } from '@ngx-liburg-frame-side';
import { IconCoreModule } from '@ngx-liburg-icon';

@Component({
  imports: [IconCoreModule, FrameComponent],
  selector: 'liburg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
}
