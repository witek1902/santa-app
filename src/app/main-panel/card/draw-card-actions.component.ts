import {Component, Input} from '@angular/core';
import {ModalsStream} from '../modals/modals.stream';

@Component({
  selector: 'santa-draw-card-actions',
  template: `
    <div class="card-action">
      <a *ngIf="canJoin" class="red-text darken-1 modal-trigger" (click)="joinToDraw()">Join</a>
      <a *ngIf="canDraw" class="red-text darken-1 modal-trigger">Draw!</a>
      <a *ngIf="canSeeParticipants"
         class="red-text darken-1 modal-trigger">Show participants</a>
      <a *ngIf="canSeeWinner"
         class="red-text darken-1 modal-trigger">Show your winner</a>
    </div>
  `
})
export class CardActionsComponent {
  @Input() canJoin = false;
  @Input() canDraw = false;
  @Input() canSeeParticipants = false;
  @Input() canSeeWinner = false;
  @Input() draw: Draw;

  constructor(private modalsStream: ModalsStream) {}

  public joinToDraw() {
    this.modalsStream.showJoinModal(this.draw);
  }
}
