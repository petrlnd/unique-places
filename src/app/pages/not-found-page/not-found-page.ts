import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StateMessage } from '../../components/state-message/state-message';

@Component({
  imports: [RouterLink, StateMessage],
  selector: 'app-not-found-page',
  styleUrl: './not-found-page.scss',
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {}
