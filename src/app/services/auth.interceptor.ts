import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'adrian-dashboard-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }

  const token = window.localStorage.getItem(TOKEN_KEY);
  if (!token || token === 'undefined' || token === 'null') {
    window.localStorage.removeItem(TOKEN_KEY);
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
