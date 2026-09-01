import { Component } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class HomeComponent {}
