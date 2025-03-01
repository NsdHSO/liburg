import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameWholeModule } from '@ngx-liburg-frame-side';
import { IconCoreModule } from '@ngx-liburg-icon';

@Component({
  standalone: true,
  imports: [RouterModule, FrameWholeModule, IconCoreModule],
  selector: 'liburg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
}
