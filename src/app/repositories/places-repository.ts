import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../api-url';
import { Category } from '../types/category';
import { ListResponse } from '../types/list-response';
import { Place } from '../types/place';

@Service()
export class PlacesRepository {
  private readonly http = inject(HttpClient);

  getPlaces(category: Category | 'all'): Observable<Place[]> {
    const params = category === 'all' ? new HttpParams() : new HttpParams().set('category', category);
    return this.http
      .get<ListResponse<Place>>(`${API_URL}/api/places`, { params })
      .pipe(map((response) => response.items.map(withFullImageUrl)));
  }
}

export function withFullImageUrl(place: Place): Place {
  return { ...place, imageUrl: `${API_URL}${place.imageUrl}` };
}
