import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiBaseUrl = getApiBaseUrl();
  private readonly userSignal = signal<AuthUser | null>(this.readStoredUser());

  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.getToken() && this.userSignal()));

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
    return window.localStorage.getItem(TOKEN_KEY);
  }

  private setSession(response: LoginResponse): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, response.access_token);
      window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }
    this.userSignal.set(response.user);
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
      return JSON.parse(raw) as AuthUser;
    } catch {
      window.localStorage.removeItem(USER_KEY);
      return null;
    }
  }
}
