import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';
import {Draw} from '../../model/draw.interface';
import {DrawService} from '../../service/draw.service';
import {DrawResult} from '../../model/draw-result.interface';

@Component({
  selector: 'santa-draw-modal',
  template: `
    <div id="draw-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <div class="row">
          <div class="col s12">
            <h4>{{draw?.name}}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p>Aby losować, podaj hasło</p>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
              <input [type]="(showPassword) ? 'text' : 'password'"
                     [(ngModel)]="password" name="password">
              <label for="password">Hasło</label>
            </div>
            <div class="col s12">
              <p>
                <input type="checkbox" id="showDrawPassword" name="showDrawPassword" [(ngModel)]="showPassword"/>
                <label for="showDrawPassword">Pokaż hasło</label>
              </p>
            </div>
          </form>
        </div>
        <div *ngIf="errorMessage" class="row">
          <div class="col s12">
            <b class="red-text">{{errorMessage}}</b>
          </div>
        </div>
        <div *ngIf="successMessage" class="row">
          <div class="col s12">
            <b class="green-text">{{successMessage}}</b>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="drawPairs()">Losuj</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Zamknij</a>
      </div>
    </div>
  `
})
export class DrawModalComponent extends BaseModal implements OnInit {

  public draw: Draw;
  public password = '';
  public showPassword = false;

  constructor(private modalsStream: ModalsStream, private drawService: DrawService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.openModal$ = this.modalsStream.getDrawModalStream().subscribe(
      draw => {
        this.draw = draw;
        this.password = '';
        this.showPassword = false;
        this.openModal();
      }
    );
  }

  public drawPairs() {
    const drawResult: DrawResult = this.drawService.startDraw(this.draw, this.password);

    if (drawResult.success) {
      this.errorMessage = '';
      this.successMessage = `Udało się wylosować pary dla ${this.draw.name}`;
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Nie można wylosować par dla ${this.draw.name}; ${drawResult.errorMessage}`;
    }
  }
}
