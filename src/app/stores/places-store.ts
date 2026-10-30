import { inject, Service, signal } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { delayedLoading } from '../operators/delayed-loading';
import { PlacesRepository } from '../repositories/places-repository';
import { Category } from '../types/category';
import { LoadStatus } from '../types/load-status';
import { Place } from '../types/place';

@Service({ autoProvided: false })
export class PlacesStore {
  private readonly placesRepository = inject(PlacesRepository);

  private readonly items = signal<Place[]>([]);
  private readonly loadStatus = signal<LoadStatus>('idle');

  readonly places = this.items.asReadonly();
  readonly status = this.loadStatus.asReadonly();

  load(category: Category | 'all'): Observable<void> {
    return this.placesRepository.getPlaces(category).pipe(
      delayedLoading(() => this.loadStatus.set('loading')),
      tap((places) => {
        this.items.set(places);
        this.loadStatus.set('success');
      }),
      map(() => undefined),
      catchError(() => {
        this.loadStatus.set('error');
        return EMPTY;
      }),
    );
  }
}
