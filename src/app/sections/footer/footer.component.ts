import { Component } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
