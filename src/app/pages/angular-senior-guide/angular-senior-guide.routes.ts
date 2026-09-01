import { Routes } from '@angular/router';
import { GUIDE_ENGLISH_TRANSLATION_OVERRIDES } from '../../i18n/guide-translation-overrides.en';
import { GUIDE_ENGLISH_TRANSLATIONS } from '../../i18n/guide-translations.en';
import { LanguageService } from '../../i18n/language.service';
import {
  ACTIVE_TRANSLATIONS,
  APP_LANGUAGE,
  TranslationMap,
} from '../../i18n/language.tokens';

const ENGLISH_TRANSLATIONS: TranslationMap = {
  ...GUIDE_ENGLISH_TRANSLATIONS,
  ...GUIDE_ENGLISH_TRANSLATION_OVERRIDES,
};

const guideRoute = (
  language: 'en' | 'es',
  translations: TranslationMap
): Routes => [
  {
    path: '',
    pathMatch: 'full',
    providers: [
      LanguageService,
      { provide: APP_LANGUAGE, useValue: language },
      { provide: ACTIVE_TRANSLATIONS, useValue: translations },
    ],
    loadComponent: () =>
      import('./angular-senior-guide.component').then(
        m => m.AngularSeniorGuideComponent
      ),
  },
];

export const englishGuideRoutes = guideRoute('en', ENGLISH_TRANSLATIONS);
export const spanishGuideRoutes = guideRoute('es', {});
