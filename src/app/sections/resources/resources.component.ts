import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent {
  private readonly document = inject(DOCUMENT);
  protected readonly languageService = inject(LanguageService);

  protected guidePath(): string {
    return `/${this.languageService.language()}/angular-senior`;
  }

  protected scrollToPageTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
