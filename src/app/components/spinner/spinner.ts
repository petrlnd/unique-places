import { Component } from '@angular/core';

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
  selector: 'app-spinner',
  styleUrl: './spinner.scss',
  templateUrl: './spinner.html',
})
export class Spinner {
  protected readonly dots = SPINNER_DOTS;
}
