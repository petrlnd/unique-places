import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthRepository } from '../repositories/auth-repository';
import { TokenStorage } from '../services/token-storage';

@Service()
export class AuthStore {
  private readonly authRepository = inject(AuthRepository);
  private readonly tokenStorage = inject(TokenStorage);
  private readonly router = inject(Router);

  private readonly token = signal(this.tokenStorage.getAccessToken());

  readonly accessToken = this.token.asReadonly();
  readonly isAuthenticated = computed(() => this.token() !== null);

  login(email: string, password: string): Observable<void> {
    return this.authRepository.login(email, password).pipe(
      tap(({ accessToken, refreshToken }) => {
        this.tokenStorage.setTokens(accessToken, refreshToken);
        this.token.set(accessToken);
      }),
      map(() => undefined),
    );
  }

  refresh(): Observable<string> {
    return this.authRepository.refresh(this.tokenStorage.getRefreshToken() ?? '').pipe(
      map(({ accessToken }) => accessToken),
      tap((accessToken) => {
        this.tokenStorage.setAccessToken(accessToken);
        this.token.set(accessToken);
      }),
    );
  }

  logout(): void {
    this.authRepository
      .logout(this.tokenStorage.getRefreshToken() ?? '')
      .pipe(catchError(() => of(null)))
      .subscribe(() => this.clearSession());
  }

  clearSession(): void {
    this.tokenStorage.clear();
    this.token.set(null);
    this.router.navigate(['/login']);
  }
}
