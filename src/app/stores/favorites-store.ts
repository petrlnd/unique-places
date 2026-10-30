import { computed, inject, Service, signal } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { delayedLoading } from '../operators/delayed-loading';
import { FavoritesRepository } from '../repositories/favorites-repository';
import { LoadStatus } from '../types/load-status';
import { Place } from '../types/place';

@Service()
export class FavoritesStore {
  private readonly favoritesRepository = inject(FavoritesRepository);

  private readonly items = signal<Place[]>([]);
  private readonly loadStatus = signal<LoadStatus>('idle');

  readonly favorites = this.items.asReadonly();
  readonly status = this.loadStatus.asReadonly();
  readonly count = computed(() => this.items().length);

  load(): Observable<void> {
    this.items.set([]);
    this.loadStatus.set('idle');
    return this.favoritesRepository.getFavorites().pipe(
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

  isFavorite(id: string): boolean {
    return this.items().some((place) => place.id === id);
  }

  toggle(id: string): void {
    const request: Observable<unknown> = this.isFavorite(id)
      ? this.favoritesRepository
          .removeFavorite(id)
          .pipe(tap(() => this.items.update((places) => places.filter((place) => place.id !== id))))
      : this.favoritesRepository
          .addFavorite(id)
          .pipe(tap((place) => this.items.update((places) => [...places, place])));

    request.pipe(catchError(() => EMPTY)).subscribe();
  }
}
