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
            <p>To draw, please, pass a password</p>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
              <input id="password" [type]="(showPassword) ? 'text' : 'password'"
                     [(ngModel)]="password" name="password">
              <label for="password">Password</label>
            </div>
            <div class="col s12">
              <p>
                <input type="checkbox" id="showDrawPassword" name="showDrawPassword" [(ngModel)]="showPassword"/>
                <label for="showDrawPassword">Show Password</label>
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
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="drawPairs()">Draw</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Close</a>
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
    const drawed: DrawResult = this.drawService.startDraw(this.draw, this.password);

    if (drawed.success) {
      this.errorMessage = '';
      this.successMessage = `You have successfully drawed pairs in ${this.draw.name}`;
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Cannot draw for ${this.draw.name}; ${drawed.errorMessage}`;
    }
  }
}
