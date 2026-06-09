import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule]
})
export class HomeComponent {
  isLoading = true;

  onImageLoad() {
    this.isLoading = false;
  }
}
