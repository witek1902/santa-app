import {Component, OnInit} from '@angular/core';
import {BaseModal} from './base-modal.component';
import {ModalsStream} from './modals.stream';
import {DrawService} from '../../service/draw.service';

@Component({
  selector: 'santa-new-draw-modal',
  template: `
    <div id="new-draw-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <div class="row">
          <div class="col s12">
            <h4>Stwórz losowanie</h4>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
              <input id="name" type="text"
                     [(ngModel)]="name" name="name">
              <label for="name">Nazwa</label>
            </div>
            <div class="input-field col s12">
              <textarea id="description" type="text" class="materialize-textarea"
                        [(ngModel)]="description" name="description"></textarea>
              <label for="description">Opis</label>
            </div>
            <div class="input-field col s12">
              <input [type]="(showPassword) ? 'text' : 'password'"
                     [(ngModel)]="password" name="password">
              <label for="password">Hasło</label>
            </div>
            <div class="input-field col s12">
              <input id="moneyLimit" type="number" min="0" step="1"
                     [(ngModel)]="moneyLimit" name="moneyLimit">
              <label for="moneyLimit">Limit pieniężny (0 oznacza brak limitu)</label>
            </div>
            <div class="input-field col s12">
              <input id="wish" type="text"
                     [(ngModel)]="wish" name="wish">
              <label for="wish">Twoje życzenie (co chciałbyś dostać od św Mikołaja?)</label>
            </div>
            <div class="col s12">
              <p>
                <input type="checkbox" id="showNewPassword" name="showNewPassword" [(ngModel)]="showPassword"/>
                <label for="showNewPassword">Pokaż hasło</label>
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
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="createNewDraw()">Stwórz</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Zamknij</a>
      </div>
    </div>
  `
})
export class NewDrawModalComponent extends BaseModal implements OnInit {
  public name = '';
  public wish = '';
  public description = '';
  public password = '';
  public moneyLimit = 0;
  public showPassword = false;

  constructor(private modalsStream: ModalsStream, private drawService: DrawService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.openModal$ = this.modalsStream.getNewDrawModalStream().subscribe(
      () => {
        this.name = '';
        this.wish = '';
        this.description = '';
        this.password = '';
        this.moneyLimit = 0;
        this.showPassword = false;
        this.openModal();
      }
    );
  }

  public createNewDraw() {
    const {name, description, password, moneyLimit, wish} = this;

    if (name.length > 30) {
      this.errorMessage = this.errorMessage + 'Nazwa maksymalnie 30 znaków. ';
    }

    if (this.description.length > 150) {
      this.errorMessage = this.errorMessage + 'Opis maksymalnie 150 znaków. ';
    }

    if (this.password.length < 2) {
      this.errorMessage = this.errorMessage + 'Hasło minimum 2 znaki. ';
    }

    if (this.moneyLimit < 0) {
      this.errorMessage = this.errorMessage + 'Limit pieniężny nie może być mniejszy niż 0.';
    }

    if (this.errorMessage.length > 0) {
      return;
    }

    const newDraw = {
      name,
      description,
      password,
      moneyLimit,
      wish
    };

    const created = this.drawService.createDraw(newDraw);

    if (created) {
      this.errorMessage = '';
      this.successMessage = `Stworzyłeś losowanie ${this.name}.`;
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Nie można stworzyć losowania ${this.name}, spróbuj ponownie.`;
    }
  }
}
