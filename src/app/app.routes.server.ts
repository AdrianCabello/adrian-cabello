import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'en',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'es',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'angular-senior',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'en/angular-senior',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'es/angular-senior',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
