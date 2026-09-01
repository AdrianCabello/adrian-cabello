import { Routes } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
import {
  ACTIVE_TRANSLATIONS,
  APP_LANGUAGE,
  TranslationMap,
} from '../../i18n/language.tokens';
import { SITE_SPANISH_TRANSLATION_OVERRIDES } from '../../i18n/site-translation-overrides.es';
import { SITE_SPANISH_TRANSLATIONS } from '../../i18n/site-translations.es';

const SPANISH_TRANSLATIONS: TranslationMap = {
  ...SITE_SPANISH_TRANSLATIONS,
  ...SITE_SPANISH_TRANSLATION_OVERRIDES,
};

const publicSiteRoute = (
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
      import('./public-site.component').then(m => m.PublicSiteComponent),
  },
];

export const englishPublicSiteRoutes = publicSiteRoute('en', {});
export const spanishPublicSiteRoutes = publicSiteRoute(
  'es',
  SPANISH_TRANSLATIONS
);
