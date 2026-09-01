import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'angular-senior',
    loadComponent: () =>
      import(
        './pages/angular-senior-guide/angular-senior-guide.component'
      ).then(m => m.AngularSeniorGuideComponent),
  },
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
