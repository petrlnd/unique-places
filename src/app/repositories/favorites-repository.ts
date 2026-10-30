import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../api-url';
import { ListResponse } from '../types/list-response';
import { Place } from '../types/place';
import { withFullImageUrl } from './places-repository';

@Service()
export class FavoritesRepository {
  private readonly http = inject(HttpClient);

  getFavorites(): Observable<Place[]> {
    return this.http
      .get<ListResponse<Place>>(`${API_URL}/api/favorites`)
      .pipe(map((response) => response.items.map(withFullImageUrl)));
  }

  addFavorite(placeId: string): Observable<Place> {
    return this.http
      .post<{ place: Place }>(`${API_URL}/api/favorites`, { placeId })
      .pipe(map((response) => withFullImageUrl(response.place)));
  }

  removeFavorite(placeId: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${API_URL}/api/favorites/${placeId}`);
  }
}
