import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-map-marker',
  styleUrl: './map-marker.scss',
  templateUrl: './map-marker.html',
})
export class MapMarker {
  readonly active = input(false);
}
