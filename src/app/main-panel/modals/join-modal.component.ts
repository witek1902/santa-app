import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';
import {Draw} from '../../model/draw.interface';
import {DrawService} from '../../service/draw.service';

@Component({
  selector: 'santa-join-modal',
  template: `
    <div id="join-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <div class="row">
          <div class="col s12">
            <h4>{{draw?.name}}</h4>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
              <input id="password" [type]="(showPassword) ? 'text' : 'password'"
                     [(ngModel)]="password" name="password">
              <label for="password">Password</label>
            </div>
            <div class="input-field col s12">
              <input id="wish" type="text"
                     [(ngModel)]="wish" name="wish">
              <label for="wish">What do you want from Santa this year?</label>
            </div>
            <div class="col s12">
              <p>
                <input type="checkbox" id="showJoinPassword" name="showJoinPassword" [(ngModel)]="showPassword"/>
                <label for="showJoinPassword">Show Password</label>
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
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="joinToDraw()">Join</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Close</a>
      </div>
    </div>
  `
})
export class JoinModalComponent extends BaseModal implements OnInit {

  public draw: Draw;
  public password = '';
  public wish = '';
  public showPassword = false;

  constructor(private modalsStream: ModalsStream, private drawService: DrawService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.openModal$ = this.modalsStream.getJoinModalStream().subscribe(
      draw => {
        this.draw = draw;
        this.password = '';
        this.wish = '';
        this.showPassword = false;
        this.openModal();
      }
    );
  }

  public joinToDraw() {
    const joined = this.drawService.joinToDraw(this.draw, this.password, this.wish);
    if (joined) {
      this.successMessage = `You have successfully joined to draw ${this.draw.name}`;
      this.errorMessage = '';
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Cannot join to ${this.draw.name}`;
    }
  }
}
