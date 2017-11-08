import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';

@Component({
  selector: 'santa-participants-modal',
  template: `
    <div id="participants-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <h4>{{draw?.name}}</h4>
        <ul class="collection">
          <li *ngFor="let participant of draw?.participants" class="collection-item avatar">
            <img src="http://materializecss.com/images/yuna.jpg" alt="" class="circle">
            <span [ngClass]="(draw?.owner == participant) ? 'red-text darken-1 title' : 'title'">{{participant}}</span>
            <p *ngIf="draw?.owner != participant">Participant</p>
            <p *ngIf="draw?.owner == participant" class="red-text darken-1">Participant<br>Owner</p>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Close</a>
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
