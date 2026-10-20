import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { getApiBaseUrl } from './api-url';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined' || !req.url.startsWith(getApiBaseUrl())) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();
  const isLogin = req.url.endsWith('/auth/login');
  const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (!isLogin && error instanceof HttpErrorResponse && error.status === 401) {
        authService.handleUnauthorized();
      }
      return throwError(() => error);
    }),
  );
};
