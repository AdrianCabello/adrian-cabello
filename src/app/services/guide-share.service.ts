import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ADRIAN_CLIENT_ID, getApiBaseUrl } from './api-url';

interface ShareCountResponse {
  readonly shareCount: number;
}

@Injectable({ providedIn: 'root' })
export class GuideShareService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${getApiBaseUrl()}/public/clients/${ADRIAN_CLIENT_ID}/guides/angular-senior/shares`;

  getShareCount(): Observable<number | null> {
    return this.http.get<ShareCountResponse>(this.endpoint).pipe(
      map(response => this.validShareCount(response.shareCount)),
      catchError(() => of(null))
    );
  }

  incrementShareCount(): Observable<number | null> {
    return this.http.post<ShareCountResponse>(this.endpoint, {}).pipe(
      map(response => this.validShareCount(response.shareCount)),
      catchError(() => of(null))
    );
  }

  private validShareCount(value: number): number | null {
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  }
}
