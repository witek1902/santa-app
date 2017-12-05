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
            <h4>Send me a message</h4>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p>If you have some feedback about app or you want to leave a message or send anything
              (funny dogs are ok!), it is a good place for that! You can write message in English or in Polish.
              Thank you for your time and for using this app :)
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p> For more information, check my <a href="http://simplecoding.pl" target="_blank">blog</a>.</p>
          </div>
        </div>
        <div class="row">
          <form materialize>
            <div class="input-field col s12">
               <textarea id="message" type="text" class="materialize-textarea"
                         [(ngModel)]="message" name="message"></textarea>
              <label for="message">Your Message</label>
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
        <a class="modal-action waves-effect waves-blue btn-flat" (click)="sendMessage()">Send</a>
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Close</a>
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
      this.successMessage = `You have successfully sent me a message. Thank you! :)`;
      this.errorMessage = '';
      setTimeout(() => this.closeModal(), 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = `Cannot send a message :( Try again soon.`;
    }
  }
}
