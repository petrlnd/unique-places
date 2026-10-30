import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../api-url';
import { LoginResponse } from '../types/login-response';

@Service()
export class AuthRepository {
  private readonly http = inject(HttpClient);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/api/auth/login`, { email, password });
  }

  refresh(refreshToken: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${API_URL}/api/auth/refresh`, { refreshToken });
  }

  logout(refreshToken: string): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${API_URL}/api/auth/logout`, { refreshToken });
  }
}
