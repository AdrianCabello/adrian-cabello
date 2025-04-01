import { trigger } from '@angular/animations';
import { animate } from '@angular/animations';
import { style } from '@angular/animations';
import { state } from '@angular/animations';
import { transition } from '@angular/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  animations: [
    trigger('menuAnimation', [
      state('closed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('open', style({ height: '*', opacity: 1 })),
      transition('closed <=> open', [animate('200ms ease-in-out')]),
    ]),
  ],
  standalone: true,
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
