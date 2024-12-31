import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.routes').then((m) => m.routes),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
