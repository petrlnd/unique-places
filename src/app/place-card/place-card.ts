import { Component, input, output } from '@angular/core';
import { Place } from '../types/place';
import { CategoryPipe } from '../pipes/category-pipe';
import { PricePipe } from '../pipes/price-pipe';
import { RatingPipe } from '../pipes/rating-pipe';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  imports: [CategoryPipe, PricePipe, RatingPipe, TooltipDirective],
  selector: 'app-place-card',
  styleUrl: './place-card.scss',
  templateUrl: './place-card.html',
})
export class PlaceCard {
  readonly place = input.required<Place>();
  readonly isFavorite = input(false);
  readonly openDetails = output();
  readonly favoriteToggle = output();
}
