import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  disabled,
  email,
  form,
  FormField,
  FormRoot,
  required,
  TreeValidationResult,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Footer } from '../../layout/footer/footer';
import { AuthStore } from '../../stores/auth-store';

@Component({
  imports: [Footer, FormField, FormRoot],
  selector: 'app-login-page',
  styleUrl: './login-page.scss',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  private readonly credentials = signal({ email: '', password: '' });

  protected readonly loginForm = form(
    this.credentials,
    (path) => {
      required(path.email, { message: 'Введите email' });
      email(path.email, { message: 'Неверный email' });
      required(path.password, { message: 'Введите пароль' });
      disabled(path.email, { when: ({ state }) => state.submitting() });
      disabled(path.password, { when: ({ state }) => state.submitting() });
    },
    { submission: { action: () => this.login() } },
  );

  protected readonly passwordVisible = signal(false);

  private async login(): Promise<TreeValidationResult> {
    const { email, password } = this.credentials();
    try {
      await firstValueFrom(this.authStore.login(email, password));
    } catch (error) {
      return { kind: 'server', message: getServerMessage(error) };
    }
    await this.router.navigate(['/places']);
    return undefined;
  }
}

const LOGIN_FAILED_MESSAGE = 'Не удалось войти. Попробуйте ещё раз';

function getServerMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse && error.status !== 0 && error.error?.message) {
    return error.error.message;
  }
  return LOGIN_FAILED_MESSAGE;
}
