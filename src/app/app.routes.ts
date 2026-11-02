import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { Layout } from './layout/layout';
import { MapPage } from './pages/map-page/map-page';

export const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'places',
            loadComponent: () =>
              import('./pages/places-page/places-page').then((m) => m.PlacesPage),
          },
          {
            path: 'favorites',
            loadComponent: () =>
              import('./pages/favorites-page/favorites-page').then((m) => m.FavoritesPage),
          },
          { path: 'map', component: MapPage },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
      },
    ],
  },
];
