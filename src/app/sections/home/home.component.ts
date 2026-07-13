import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [],
})
export class HomeComponent {
  isLoading = true;

  onImageLoad(): void {
    this.isLoading = false;
  }
}
