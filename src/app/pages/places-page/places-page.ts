import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, startWith, Subject, switchMap, tap } from 'rxjs';
import { StateMessage } from '../../components/state-message/state-message';
import { CategoryPipe } from '../../pipes/category-pipe';
import { PlaceCard } from '../../place-card/place-card';
import { PlaceModal } from '../../place-modal/place-modal';
import { FavoritesStore } from '../../stores/favorites-store';
import { PlacesStore } from '../../stores/places-store';
import { Category } from '../../types/category';
import { Place } from '../../types/place';

const CATEGORIES: Category[] = [
  'hotel',
  'restaurant',
  'entertainment',
  'nature',
  'culture',
  'architecture',
  'spa',
];

@Component({
  imports: [CategoryPipe, PlaceCard, PlaceModal, RouterLink, StateMessage],
  providers: [PlacesStore],
  selector: 'app-places-page',
  styleUrl: './places-page.scss',
  templateUrl: './places-page.html',
})
export class PlacesPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly placesStore = inject(PlacesStore);
  protected readonly favoritesStore = inject(FavoritesStore);

  protected readonly categories = CATEGORIES;

  protected readonly selectedCategory = signal<Category | 'all'>('all');

  protected readonly selectedPlace = signal<Place | null>(null);

  private readonly retry$ = new Subject<void>();

  constructor() {
    const category$ = this.route.queryParamMap.pipe(
      map((params) => toCategory(params.get('category'))),
      distinctUntilChanged(),
      tap((category) => this.selectedCategory.set(category)),
    );

    combineLatest([category$, this.retry$.pipe(startWith(undefined))])
      .pipe(
        switchMap(([category]) => this.placesStore.load(category)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected retry(): void {
    this.retry$.next();
  }
}

function toCategory(value: string | null): Category | 'all' {
  return CATEGORIES.find((category) => category === value) ?? 'all';
}
