import {Component} from '@angular/core';

@Component({
  selector: 'santa-modals',
  template: `
    <santa-join-modal></santa-join-modal>
    <santa-draw-modal></santa-draw-modal>
    <santa-participants-modal></santa-participants-modal>
    <santa-winner-modal></santa-winner-modal>
  `
})
export class ModalsComponent {

}
