import { Routes } from '@angular/router';
import { privateUiProviders } from './private-ui.providers';
import { authGuard } from './services/auth.guard';

export const privateRoutes: Routes = [
  {
    path: 'login',
    providers: privateUiProviders,
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard/proyectos',
    canActivate: [authGuard],
    providers: privateUiProviders,
    loadComponent: () =>
      import('./pages/portfolio-projects/portfolio-projects.component').then(
        m => m.PortfolioProjectsComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    providers: privateUiProviders,
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
  },
  {
    path: 'admin',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'gastos',
    canActivate: [authGuard],
    providers: privateUiProviders,
    loadComponent: () =>
      import('./pages/expenses/expenses.component').then(
        m => m.ExpensesComponent
      ),
  },
  {
    path: 'tareas/nueva',
    canActivate: [authGuard],
    providers: privateUiProviders,
    loadComponent: () =>
      import('./pages/new-task/new-task.component').then(
        m => m.NewTaskComponent
      ),
  },
  {
    path: 'movimiento-rapido',
    canActivate: [authGuard],
    providers: privateUiProviders,
    loadComponent: () =>
      import('./pages/quick-movement/quick-movement.component').then(
        m => m.QuickMovementComponent
      ),
  },
];
