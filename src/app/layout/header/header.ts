import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../stores/auth-store';
import { FavoritesStore } from '../../stores/favorites-store';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly authStore = inject(AuthStore);
  protected readonly favoritesStore = inject(FavoritesStore);
}
