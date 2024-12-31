import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpinnerComponent } from '../components/spinner/spinner.component';
import { GlobalLoaderService } from './global-loader.service';

@Component({
  selector: 'app-global-loader',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalLoaderComponent {
  loading$;

  constructor(private globalLoader: GlobalLoaderService) {
    this.loading$ = this.globalLoader.loading$;
  }
}
