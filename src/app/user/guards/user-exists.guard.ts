import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { UsersService } from '../users.service';

export const userExistsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const usersService = inject(UsersService);
  const userId = Number(route.paramMap.get('id'));
  const redirectUrl = router.parseUrl('/404');

  if (isNaN(userId)) {
    return of(redirectUrl);
  }

  return usersService.getUserById(userId).pipe(
    map((user) => {
      if (user) {
        route.data = { user };

        return true;
      }

      return redirectUrl;
    }),
    catchError(() => {
      return of(redirectUrl);
    })
  );
};
