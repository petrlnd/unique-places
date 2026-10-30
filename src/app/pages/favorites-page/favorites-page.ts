import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { StateMessage } from '../../components/state-message/state-message';
import { PlaceCard } from '../../place-card/place-card';
import { PlaceModal } from '../../place-modal/place-modal';
import { FavoritesStore } from '../../stores/favorites-store';
import { Place } from '../../types/place';

@Component({
  imports: [PlaceCard, PlaceModal, RouterLink, StateMessage],
  selector: 'app-favorites-page',
  styleUrl: './favorites-page.scss',
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  protected readonly favoritesStore = inject(FavoritesStore);

  protected readonly selectedPlace = signal<Place | null>(null);

  private readonly retry$ = new Subject<void>();

  constructor() {
    this.retry$
      .pipe(
        switchMap(() => this.favoritesStore.load()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected retry(): void {
    this.retry$.next();
  }
}
