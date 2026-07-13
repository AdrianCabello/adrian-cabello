import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
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
