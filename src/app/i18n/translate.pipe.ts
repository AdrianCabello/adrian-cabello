import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(value: string | null | undefined): string {
    return value ? this.languageService.translate(value) : '';
  }
}
