import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';
import {Draw} from '../../model/draw.interface';
import {UserEntry} from '../../model/user-entry.interface';
import {DrawService} from '../../service/draw.service';

@Component({
  selector: 'santa-winner-modal',
  template: `
    <div id="winner-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <h4>{{draw?.name}}; Limit: {{draw?.moneyLimit || '-'}} zł</h4>
        <div class="winner-modal__winner-title">
          <img [src]="winner?.photoURL" alt="" class="circle">
          <p>{{winner?.displayName}}</p>
        </div>
        <div class="winner-modal__winner-subtitle">
          <p>Życzenie: {{winner?.wish || 'Nie podano'}}</p>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Zamknij</a>
      </div>
    </div>
  `
})
export class WinnerModalComponent extends BaseModal implements OnInit {

  public draw: Draw;
  public winner: UserEntry;

  constructor(private modalsStream: ModalsStream, private drawService: DrawService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.openModal$ = this.modalsStream.getWinnerModalStream().subscribe(
      draw => {
        this.draw = draw;
        this.drawService.getWinner(this.draw).then(winner => this.winner = winner);
        this.openModal();
      }
    );
  }

  closeModal() {
    super.closeModal();
  }
}
