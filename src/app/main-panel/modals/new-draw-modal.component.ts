import {Component, OnInit} from '@angular/core';
import {BaseModal} from './base-modal.component';
import {ModalsStream} from './modals.stream';
import {DrawService} from "../../service/draw.service";

@Component({
  selector: 'santa-new-draw-modal',
  template: `
    <div id="new-draw-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <div class="row">
          <div class="col s12">
            <h4>Create draw</h4>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
              <input id="name" type="text"
                     [(ngModel)]="name" name="name">
              <label for="name">Name</label>
            </div>
            <div class="input-field col s12">
              <textarea id="description" type="text" class="materialize-textarea"
                        [(ngModel)]="description" name="description"></textarea>
              <label for="description">Description</label>
            </div>
            <div class="input-field col s12">
              <input id="password" [type]="(showPassword) ? 'text' : 'password'"
                     [(ngModel)]="password" name="password">
              <label for="password">Password</label>
            </div>
            <div class="col s12">
              <p>
                <input type="checkbox" id="showNewPassword" name="showNewPassword" [(ngModel)]="showPassword"/>
                <label for="showNewPassword">Show Password</label>
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
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="createNewDraw()">Create</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Close</a>
      </div>
    </div>
  `
})
export class NewDrawModalComponent extends BaseModal implements OnInit {
  public name = '';
  public description = '';
  public password = '';
  public showPassword = false;

  constructor(private modalsStream: ModalsStream, private drawService: DrawService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.openModal$ = this.modalsStream.getNewDrawModalStream().subscribe(
      () => {
        this.name = '';
        this.description = '';
        this.password = '';
        this.showPassword = false;
        this.openModal();
      }
    );
  }

  public createNewDraw() {
    const {name, description, password} = this;
    const newDraw = {
      name,
      description,
      password
    };

    const created = this.drawService.createDraw(newDraw);

    if (created) {
      this.errorMessage = '';
      this.successMessage = `You have successfully created ${this.name} draw`;
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Cannot create ${this.name} draw, try again.`;
    }
  }
}
