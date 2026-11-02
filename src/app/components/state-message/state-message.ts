import { Component, input } from '@angular/core';
import { Spinner } from '../spinner/spinner';

@Component({
  imports: [Spinner],
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
  readonly compact = input(false);
}
