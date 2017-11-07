import {Component, Input} from '@angular/core';

@Component({
  selector: 'santa-card-actions',
  template: `
    <div class="card-action">
      <a *ngIf="canJoin" href="" class="red-text darken-1">Join</a>
      <a *ngIf="canDraw" href="" class="red-text darken-1">Draw!</a>
      <a *ngIf="canSeeParticipants" href=""
         class="red-text darken-1">Show participants</a>
      <a *ngIf="canSeeWinner" href=""
         class="red-text darken-1">Show your winner</a>
    </div>
  `
})
export class CardActionsComponent {
  @Input() canJoin = false;
  @Input() canDraw = false;
  @Input() canSeeParticipants = false;
  @Input() canSeeWinner = false;
}
