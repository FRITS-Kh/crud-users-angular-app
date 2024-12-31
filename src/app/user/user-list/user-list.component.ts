import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

import { AppRouterService } from '../../services/app-router.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { User } from '../user.interfaces';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UserListItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  private destroyRef = inject(DestroyRef);

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private appRouter: AppRouterService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.users$ = this.activatedRoute.data.pipe(map((data) => data['users']));
  }

  open() {
    this.modalService.open(AddUserComponent).result.then(
      () => this.appRouter.reload(),
      () => {}
    );
  }

  removeUser(id: number): void {
    this.usersService
      .deleteUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.appRouter.reload(),
      });
  }
}
