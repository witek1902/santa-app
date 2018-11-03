import {Component} from '@angular/core';
import {ModalsStream} from './modals/modals.stream';

@Component({
  selector: 'santa-fab-button',
  template: `
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light red darken-1 tooltipped"
         materialize="tooltip" data-position="left" data-delay="50" data-tooltip="Dodaj losowanie"
         (click)="createDraw()">
        <i class="material-icons">add</i>
      </a>
    </div>`
})
export class FabButtonComponent {

  constructor(private modalsStream: ModalsStream) {
  }

  public createDraw() {
    this.modalsStream.showNewDrawModal();
  }

}
