import {Component, Input} from '@angular/core';

@Component({
  selector: 'santa-card-tags',
  template: `
    <span *ngIf="isActive" class="new badge blue" data-badge-caption="ACTIVE"></span>
    <span *ngIf="isFinished" class="new badge red" data-badge-caption="FINISHED"></span>
    <span *ngIf="isOwner" class="new badge pink" data-badge-caption="OWNER"></span>
    <span *ngIf="isParticipant" class="new badge green" data-badge-caption="PARTICIPATE"></span>
  `
})
export class CardTagsComponent {
  @Input() isActive = false;
  @Input() isFinished = false;
  @Input() isOwner = false;
  @Input() isParticipant = false;
}
