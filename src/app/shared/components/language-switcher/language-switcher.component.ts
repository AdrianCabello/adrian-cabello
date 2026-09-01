import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppLanguage, LanguageService } from '../../../i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  protected selectLanguage(language: AppLanguage): void {
    if (language === this.languageService.language()) {
      return;
    }

    const currentUrl = this.router.parseUrl(this.router.url);
    const isGuide = currentUrl.root.children['primary']?.segments.some(
      segment => segment.path === 'angular-senior'
    );
    const commands = isGuide ? [language, 'angular-senior'] : [language];
    void this.router.navigate(commands, {
      fragment: currentUrl.fragment ?? undefined,
      queryParamsHandling: 'preserve',
    });
  }
}
