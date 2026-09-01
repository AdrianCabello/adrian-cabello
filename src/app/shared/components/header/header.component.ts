import { Component, signal } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslatePipe } from '../../../i18n/translate.pipe';

@Component({
  selector: 'app-header',
  imports: [LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(isOpen => !isOpen);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
