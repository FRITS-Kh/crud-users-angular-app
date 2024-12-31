import { Routes } from '@angular/router';

import { userExistsGuard } from './guards/user-exists.guard';
import { usersResolver } from './users.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
    resolve: { users: usersResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'user/:id/edit',
    loadComponent: () =>
      import('./edit-user/edit-user.component').then(
        (c) => c.EditUserComponent
      ),
    canActivate: [userExistsGuard],
  },
];
