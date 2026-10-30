import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { API_URL } from '../api-url';
import { AuthStore } from '../stores/auth-store';

const PUBLIC_URLS = [`${API_URL}/api/auth/login`, `${API_URL}/api/auth/refresh`];

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(API_URL) || PUBLIC_URLS.includes(request.url)) {
    return next(request);
  }

  const authStore = inject(AuthStore);

  return next(withAccessToken(request, authStore.accessToken())).pipe(
    catchError((error: unknown) => {
      if (!isAccessTokenInvalid(error)) {
        return throwError(() => error);
      }

      return authStore.refresh().pipe(
        catchError((refreshError: unknown) => {
          authStore.clearSession();
          return throwError(() => refreshError);
        }),
        switchMap((accessToken) => next(withAccessToken(request, accessToken))),
      );
    }),
  );
};

function withAccessToken<T>(request: HttpRequest<T>, accessToken: string | null): HttpRequest<T> {
  return accessToken
    ? request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : request;
}

function isAccessTokenInvalid(error: unknown): boolean {
  return (
    error instanceof HttpErrorResponse &&
    error.status === 401 &&
    error.error?.code === 'ACCESS_TOKEN_INVALID'
  );
}
