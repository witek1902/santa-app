import {Component} from '@angular/core';

@Component({
  selector: 'santa-fab-button',
  template: `
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light red darken-1 tooltipped"
         materialize="tooltip" data-position="left" data-delay="50" data-tooltip="Add draw">
        <i class="material-icons">add</i>
      </a>
    </div>`
})
export class FabButtonComponent {

}
