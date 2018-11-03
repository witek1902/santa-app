import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';
import {Draw} from '../../model/draw.interface';

@Component({
  selector: 'santa-participants-modal',
  template: `
    <div id="participants-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <h4>{{draw?.name}}; Limit: {{draw?.moneyLimit || '-'}} zł</h4>
        <ul class="collection">
          <li *ngFor="let participant of draw?.participants" class="collection-item avatar">
            <img [src]="participant.photoURL" alt="" class="circle">
            <span [ngClass]="(draw?.owner.uid == participant.uid) ? 'red-text darken-1 title' : 'title'">{{participant.displayName}}</span>
            <p *ngIf="draw?.owner.uid !== participant.uid">Uczestnik</p>
            <p *ngIf="draw?.owner.uid === participant.uid" class="red-text darken-1">Uczestnik<br>Właściciel</p>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Zamknij</a>
      </div>
    </div>
  `
})
export class ParticipantsModalComponent extends BaseModal implements OnInit {

  public draw: Draw;

  constructor(private modalsStream: ModalsStream) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.openModal$ = this.modalsStream.getParticipantsModalStream().subscribe(
      draw => {
        this.draw = draw;
        this.openModal();
      }
    );
  }
}
