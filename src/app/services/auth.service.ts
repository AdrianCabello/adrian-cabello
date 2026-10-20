import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { getApiBaseUrl } from './api-url';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  clientId: string | null;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

const TOKEN_KEY = 'adrian-dashboard-token';
const USER_KEY = 'adrian-dashboard-user';

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return false;
    }
    const { exp } = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
    return typeof exp === 'number' && exp * 1000 <= Date.now();
  } catch {
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiBaseUrl = getApiBaseUrl();
  private readonly userSignal = signal<AuthUser | null>(this.readStoredUser());

  readonly user = this.userSignal.asReadonly();

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        this.setSession(response);
      }),
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    }
    this.userSignal.set(null);
    void this.router.navigateByUrl('/login');
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token || token === 'undefined' || token === 'null' || isTokenExpired(token)) {
      this.clearSession();
      return null;
    }

    return token;
  }

  handleUnauthorized(): void {
    this.clearSession();
    if (!this.router.url.startsWith('/login')) {
      void this.router.navigateByUrl('/login');
    }
  }

  private setSession(response: LoginResponse): void {
    const token = response.access_token;
    if (!token) {
      this.clearSession();
      throw new Error('Login response did not include an access token.');
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, token);
      if (response.user) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      } else {
        window.localStorage.removeItem(USER_KEY);
      }
    }
    this.userSignal.set(response.user ?? null);
  }

  private readStoredUser(): AuthUser | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      const user = JSON.parse(raw) as AuthUser;
      if (!user || typeof user !== 'object') {
        window.localStorage.removeItem(USER_KEY);
        return null;
      }

      return user;
    } catch {
      window.localStorage.removeItem(USER_KEY);
      return null;
    }
  }

  private clearSession(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    }
    this.userSignal.set(null);
  }
}
