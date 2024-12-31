import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlobalLoaderComponent } from './global-loader/global-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
