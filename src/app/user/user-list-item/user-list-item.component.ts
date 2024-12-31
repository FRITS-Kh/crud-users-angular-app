import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, of } from 'rxjs';

import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { GlobalLoaderService } from '../../global-loader/global-loader.service';
import { User } from '../user.interfaces';

@Component({
  selector: 'app-user-list-item',
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent {
  @Input() user!: User;
  @Output() remove = new EventEmitter<number>();

  loading$ = of(false);

  constructor(private globalLoader: GlobalLoaderService) {}

  onRemove(id: number): void {
    this.loading$ = this.globalLoader.loading$.pipe(map((loading) => !loading));
    this.remove.emit(id);
  }
}
