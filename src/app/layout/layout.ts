import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '../stores/auth-store';
import { FavoritesStore } from '../stores/favorites-store';
import { Footer } from './footer/footer';
import { Header } from './header/header';

@Component({
  imports: [Header, RouterOutlet, Footer],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {
  constructor() {
    if (inject(AuthStore).isAuthenticated()) {
      inject(FavoritesStore).load().pipe(takeUntilDestroyed()).subscribe();
    }
  }
}
