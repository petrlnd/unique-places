import { Component, input } from '@angular/core';

const SPINNER_DOTS = [
  { x: 27, y: 0, opacity: 1 },
  { x: 44, y: 6, opacity: 0.1 },
  { x: 54, y: 19, opacity: 0.2 },
  { x: 54, y: 37, opacity: 0.3 },
  { x: 44, y: 52, opacity: 0.4 },
  { x: 27, y: 57, opacity: 0.5 },
  { x: 11, y: 52, opacity: 0.6 },
  { x: 0, y: 37, opacity: 0.7 },
  { x: 0, y: 19, opacity: 0.8 },
  { x: 11, y: 6, opacity: 0.9 },
];

@Component({
  imports: [],
  selector: 'app-state-message',
  styleUrl: './state-message.scss',
  templateUrl: './state-message.html',
})
export class StateMessage {
  readonly image = input.required<string>();
  readonly imageWidth = input.required<number>();
  readonly imageHeight = input.required<number>();
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly loading = input(false);

  protected readonly spinnerDots = SPINNER_DOTS;
}
