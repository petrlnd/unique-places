import { Component, input, output } from '@angular/core';
import { Place } from '../types/place';
import { CategoryPipe } from '../pipes/category-pipe';
import { PricePipe } from '../pipes/price-pipe';
import { RatingPipe } from '../pipes/rating-pipe';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  imports: [CategoryPipe, PricePipe, RatingPipe, TooltipDirective],
  selector: 'app-place-modal',
  styleUrl: './place-modal.scss',
  templateUrl: './place-modal.html',
})
export class PlaceModal {
  readonly place = input.required<Place>();
  readonly isFavorite = input(false);
  readonly closed = output();
  readonly favoriteToggle = output();
}
