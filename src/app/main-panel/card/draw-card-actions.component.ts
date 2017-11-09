import {Component, Input} from '@angular/core';
import {ModalsStream} from '../modals/modals.stream';
import {Draw} from '../../model/draw.interface';

@Component({
  selector: 'santa-draw-card-actions',
  template: `
    <div class="card-action">
      <a *ngIf="canJoin" class="red-text darken-1 modal-trigger" (click)="joinToDraw()">Join</a>
      <a *ngIf="canDraw" class="red-text darken-1 modal-trigger" (click)="drawPairs()">Draw!</a>
      <a *ngIf="canSeeParticipants" class="red-text darken-1 modal-trigger" (click)="showParticipants()">Show participants</a>
      <a *ngIf="canSeeWinner" class="red-text darken-1 modal-trigger" (click)="showWinner()">Show your winner</a>
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

  public drawPairs() {
    this.modalsStream.showDrawModal(this.draw);
  }

  public showParticipants() {
    this.modalsStream.showParticipantsModal(this.draw);
  }

  public showWinner() {
    this.modalsStream.showWinnerModal(this.draw);
  }
}
