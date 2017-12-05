import {Component} from '@angular/core';

@Component({
  selector: 'santa-modals',
  template: `
    <santa-join-modal></santa-join-modal>
    <santa-draw-modal></santa-draw-modal>
    <santa-participants-modal></santa-participants-modal>
    <santa-winner-modal></santa-winner-modal>
    <santa-new-draw-modal></santa-new-draw-modal>
    <santa-video-modal></santa-video-modal>
    <santa-message-modal></santa-message-modal>
  `
})
export class ModalsComponent {

}
