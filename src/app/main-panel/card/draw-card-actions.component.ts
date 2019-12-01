import {Component, Input} from '@angular/core';
import {ModalsStream} from '../modals/modals.stream';
import {Draw} from '../../model/draw.interface';

@Component({
  selector: 'santa-draw-card-actions',
  template: `
    <div class="card-action">
      <a *ngIf="canJoin" class="red-text darken-1" (click)="joinToDraw()">Dołącz</a>
      <a *ngIf="canDraw" class="red-text darken-1" (click)="drawPairs()">Losuj!</a>
      <a *ngIf="canSeeParticipants" class="red-text darken-1" (click)="showParticipants()">Uczestnicy</a>
      <a *ngIf="canSeeWinner" class="red-text darken-1" (click)="showWinner()">Twój zwycięzca</a>
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
