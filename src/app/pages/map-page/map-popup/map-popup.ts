import { Component, input, output } from '@angular/core';
import { CategoryPipe } from '../../../pipes/category-pipe';
import { RatingPipe } from '../../../pipes/rating-pipe';
import { Place } from '../../../types/place';

@Component({
  imports: [CategoryPipe, RatingPipe],
  selector: 'app-map-popup',
  styleUrl: './map-popup.scss',
  templateUrl: './map-popup.html',
})
export class MapPopup {
  readonly place = input.required<Place>();
  readonly openDetails = output();
}
