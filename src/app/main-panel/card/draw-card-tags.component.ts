import {Component, Input} from '@angular/core';

@Component({
  selector: 'santa-draw-card-tags',
  template: `
    <span *ngIf="isActive" class="new badge blue" data-badge-caption="AKTYWNA"></span>
    <span *ngIf="isFinished" class="new badge red" data-badge-caption="ZAKOŃCZONA"></span>
    <span *ngIf="isOwner" class="new badge pink" data-badge-caption="WŁAŚCICIEL"></span>
    <span *ngIf="isParticipant" class="new badge green" data-badge-caption="UCZESTNIK"></span>
  `
})
export class CardTagsComponent {
  @Input() isActive = false;
  @Input() isFinished = false;
  @Input() isOwner = false;
  @Input() isParticipant = false;
}
