import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { GUIDE_ENGLISH_TRANSLATIONS } from './guide-translations.en';
import { GUIDE_ENGLISH_TRANSLATION_OVERRIDES } from './guide-translation-overrides.en';
import { SITE_SPANISH_TRANSLATIONS } from './site-translations.es';
import { SITE_SPANISH_TRANSLATION_OVERRIDES } from './site-translation-overrides.es';

export type AppLanguage = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'adrian-cabello-language';
  private readonly selectedLanguage = signal<AppLanguage>(
    this.detectInitialLanguage()
  );

  readonly language = this.selectedLanguage.asReadonly();

  constructor() {
    this.updateDocumentLanguage(this.selectedLanguage());
  }

  setLanguage(language: AppLanguage): void {
    this.selectedLanguage.set(language);
    this.updateDocumentLanguage(language);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, language);
    }
  }

  translate(value: string): string {
    if (this.selectedLanguage() === 'es') {
      return (
        SITE_SPANISH_TRANSLATION_OVERRIDES[value] ??
        SITE_SPANISH_TRANSLATIONS[value] ??
        value
      );
    }
    return (
      GUIDE_ENGLISH_TRANSLATION_OVERRIDES[value] ??
      GUIDE_ENGLISH_TRANSLATIONS[value] ??
      value
    );
  }

  private detectInitialLanguage(): AppLanguage {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    const storedLanguage = localStorage.getItem(this.storageKey);
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }

    const browserLanguage = navigator.languages?.[0] ?? navigator.language;
    return browserLanguage?.toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  private updateDocumentLanguage(language: AppLanguage): void {
    this.document.documentElement.lang = language;
  }
}
