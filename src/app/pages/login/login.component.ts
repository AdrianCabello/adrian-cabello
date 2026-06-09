import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextModule, MessageModule, PasswordModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected readonly isLoading = signal(false);
  protected readonly error = signal('');

  protected email = 'adrian@adriancabello.dev';
  protected password = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  protected submit(): void {
    if (!this.email || !this.password) {
      this.error.set('Completá email y contraseña.');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading.set(false);
        void this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.isLoading.set(false);
        this.error.set('No pude iniciar sesión con esas credenciales.');
      },
    });
  }
}
