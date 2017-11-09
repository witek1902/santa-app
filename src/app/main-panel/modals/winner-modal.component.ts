import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';
import {Draw} from '../../model/draw.interface';
import {UserEntry} from "../../model/user-entry.interface";
import {DrawService} from "../../service/draw.service";

@Component({
  selector: 'santa-winner-modal',
  template: `
    <div id="winner-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <h4>{{draw?.name}}</h4>
        <iframe *ngIf="showWow" style="width: 100%;" height="315" width="420" frameborder="0"
                src="https://www.youtube.com/embed/iXgvXuZF_yk?rel=0&controls=0&showinfo=0&autoplay=1"
        ></iframe>
        <div class="winner-modal__winner-title ">
          <img [src]="winner?.photoURL" alt="" class="circle">
          <p>{{winner?.displayName}}</p>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Close</a>
      </div>
    </div>
  `
})
export class WinnerModalComponent extends BaseModal implements OnInit {

  public draw: Draw;
  public showWow = false;
  public winner: UserEntry;

  constructor(private modalsStream: ModalsStream, private drawService: DrawService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.openModal$ = this.modalsStream.getWinnerModalStream().subscribe(
      draw => {
        this.draw = draw;
        this.openModal();
      }
    );
  }

  openModal() {
    super.openModal();
    this.showWow = true;
    this.drawService.getWinner(this.draw).then(winner => this.winner = winner);
  }

  closeModal() {
    super.closeModal();
    this.showWow = false;
  }
}
