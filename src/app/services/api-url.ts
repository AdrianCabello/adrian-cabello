export const ADRIAN_CLIENT_ID = '002a5177-2d27-4c0b-936d-dbb2d317663a';

export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://rakium-be-production.up.railway.app/api';
  }

  const override = window.localStorage.getItem('adrian-api-base-url');
  if (override) {
    return override.replace(/\/$/, '');
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000/api';
  }

  return 'https://rakium-be-production.up.railway.app/api';
}
