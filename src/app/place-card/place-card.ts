import { Component, input, output } from '@angular/core';
import { Place } from '../types/place';
import { CategoryPipe } from '../pipes/category-pipe';
import { PricePipe } from '../pipes/price-pipe';
import { RatingPipe } from '../pipes/rating-pipe';

@Component({
  imports: [CategoryPipe, PricePipe, RatingPipe],
  selector: 'app-place-card',
  styleUrl: './place-card.scss',
  templateUrl: './place-card.html',
})
export class PlaceCard {
  readonly place = input.required<Place>();
  readonly openDetails = output();
}
