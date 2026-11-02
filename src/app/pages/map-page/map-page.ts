import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';
import { StateMessage } from '../../components/state-message/state-message';
import { CategoryPipe } from '../../pipes/category-pipe';
import { Category } from '../../types/category';

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
  imports: [CategoryPipe, RouterLink, Spinner, StateMessage],
  selector: 'app-map-page',
  styleUrl: './map-page.scss',
  templateUrl: './map-page.html',
})
export class MapPage {
  protected readonly categories = CATEGORIES;

  protected readonly state = signal<'loading' | 'error' | 'empty' | 'data'>('data');
}
