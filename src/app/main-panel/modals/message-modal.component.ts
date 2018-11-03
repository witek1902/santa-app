import {Component, OnInit} from '@angular/core';
import {BaseModal} from './base-modal.component';
import {MessageService} from '../../service/message.service';
import {ModalsStream} from './modals.stream';

@Component({
  selector: 'santa-message-modal',
  template: `
    <div id="message-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <div class="row">
          <div class="col s12">
            <h4>Zostaw wiadomość</h4>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p>Jeżeli chciałbyś się podzielić opinią o aplikacji, radą, sugestią, wyślij mi tu wiadomość proszę
              (śmieszne kotki też mogą być!). Dzięki za twój czas i za używanie aplikacji :)
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p>Po więcej informacji, zapraszam na <a href="https://simplecoding.pl" target="_blank">mojego bloga</a>.</p>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
               <textarea id="message" type="text" class="materialize-textarea"
                         [(ngModel)]="message" name="message"></textarea>
              <label for="message">Twoja wiadomość</label>
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
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="sendMessage()">Wyślij</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Zamknij</a>
      </div>
    </div>
  `
})
export class MessageModalComponent extends BaseModal implements OnInit {

  public message: string;

  constructor(private modalsStream: ModalsStream, private messageService: MessageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.openModal$ = this.modalsStream.getMessageModalStream().subscribe(
      () => {
        this.message = '';
        this.openModal();
      }
    );
  }

  public sendMessage() {
    const sent = this.messageService.sendMessage(this.message);
    if (sent) {
      this.successMessage = `Udało się wysłać wiadomość. Dzięki! :)`;
      this.errorMessage = '';
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Nie można wysłać wiadomości :( Spróbuj ponownie później.`;
    }
  }
}
