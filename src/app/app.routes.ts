import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'en/angular-senior',
    loadChildren: () =>
      import('./pages/angular-senior-guide/angular-senior-guide.routes').then(
        m => m.englishGuideRoutes
      ),
  },
  {
    path: 'es/angular-senior',
    loadChildren: () =>
      import('./pages/angular-senior-guide/angular-senior-guide.routes').then(
        m => m.spanishGuideRoutes
      ),
  },
  {
    path: 'angular-senior',
    loadChildren: () =>
      import('./pages/angular-senior-guide/angular-senior-guide.routes').then(
        m => m.englishGuideRoutes
      ),
  },
  {
    path: 'en',
    loadChildren: () =>
      import('./pages/public-site/public-site.routes').then(
        m => m.englishPublicSiteRoutes
      ),
  },
  {
    path: 'es',
    loadChildren: () =>
      import('./pages/public-site/public-site.routes').then(
        m => m.spanishPublicSiteRoutes
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/public-site/public-site.routes').then(
        m => m.englishPublicSiteRoutes
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./app.private.routes').then(m => m.privateRoutes),
  },
  {
    path: '**',
    redirectTo: 'en',
  },
];
