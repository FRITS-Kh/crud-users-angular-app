import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { User } from './user.interfaces';
import { UsersService } from './users.service';

export const usersResolver: ResolveFn<User[]> = () => {
  const usersService = inject(UsersService);

  return usersService.loadUsers();
};
