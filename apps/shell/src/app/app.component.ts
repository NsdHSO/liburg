import { Component, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameWholeModule } from '@ngx-liburg-frame-side';


@Component({
  standalone: true,
  imports: [RouterModule, FrameWholeModule],
  selector: 'liburg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
}
