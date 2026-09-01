import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import {
  CODE_CHALLENGE_DRILLS,
  CODE_CHALLENGE_FORMATS,
  CODE_CHALLENGE_MOCK,
  CODE_CHALLENGE_RUBRIC,
} from './angular-senior-guide.data';

@Component({
  selector: 'app-code-challenge-prep',
  standalone: true,
  templateUrl: './code-challenge-prep.component.html',
})
export class CodeChallengePrepComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly languageService = inject(LanguageService);

  protected readonly formats = CODE_CHALLENGE_FORMATS;
  protected readonly drills = CODE_CHALLENGE_DRILLS;
  protected readonly rubric = CODE_CHALLENGE_RUBRIC;
  protected readonly mock = CODE_CHALLENGE_MOCK;
  protected readonly copiedId = signal<string | null>(null);

  protected translate(value: string): string {
    return this.languageService.translate(value);
  }

  protected async copyCode(id: string, code: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    await navigator.clipboard.writeText(code);
    this.copiedId.set(id);
    window.setTimeout(() => {
      if (this.copiedId() === id) this.copiedId.set(null);
    }, 1800);
  }
}
