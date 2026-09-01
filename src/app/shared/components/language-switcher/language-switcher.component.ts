import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../../../i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  protected selectLanguage(language: AppLanguage): void {
    this.languageService.setLanguage(language);
  }
}
