import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/public-site/public-site.component').then((m) => m.PublicSiteComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'gastos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/expenses/expenses.component').then((m) => m.ExpensesComponent),
  },
  {
    path: 'tareas/nueva',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/new-task/new-task.component').then((m) => m.NewTaskComponent),
  },
  {
    path: 'movimiento-rapido',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/quick-movement/quick-movement.component').then((m) => m.QuickMovementComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
