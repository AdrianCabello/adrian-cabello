import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/public-site/public-site.component').then(
        m => m.PublicSiteComponent
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./app.private.routes').then(m => m.privateRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
