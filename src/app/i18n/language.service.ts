import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { ACTIVE_TRANSLATIONS, APP_LANGUAGE } from './language.tokens';

export type AppLanguage = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly translations = inject(ACTIVE_TRANSLATIONS);
  private readonly selectedLanguage = signal<AppLanguage>(inject(APP_LANGUAGE));

  readonly language = this.selectedLanguage.asReadonly();

  constructor() {
    this.updateDocumentLanguage(this.selectedLanguage());
  }

  setLanguage(language: AppLanguage): void {
    this.selectedLanguage.set(language);
    this.updateDocumentLanguage(language);
  }

  translate(value: string): string {
    return this.translations[value] ?? value;
  }

  private updateDocumentLanguage(language: AppLanguage): void {
    this.document.documentElement.lang = language;
  }
}
