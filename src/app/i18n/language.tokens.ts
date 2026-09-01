import { InjectionToken } from '@angular/core';
import type { AppLanguage } from './language.service';

export type TranslationMap = Readonly<Record<string, string>>;

export const APP_LANGUAGE = new InjectionToken<AppLanguage>('APP_LANGUAGE', {
  factory: () => 'en',
});
export const ACTIVE_TRANSLATIONS = new InjectionToken<TranslationMap>(
  'ACTIVE_TRANSLATIONS',
  { factory: () => ({}) }
);
