import {AfterViewInit, Component, Input} from '@angular/core';
import {SnowService} from '../service/snow.service';

declare var $: any;

@Component({
  selector: 'santa-draws-list',
  template: `
    <div class="col s12 m6">
      <h3 class="white-text center-align">{{title}}</h3>
      <p class="white-text center-align" *ngIf="!draws">Not found.</p>
      <santa-draw-card
        *ngFor="let draw of draws"
        [draw]="draw"
      ></santa-draw-card>
    </div>
  `
})
export class DrawsListComponent implements AfterViewInit {
  @Input() title = '';
  @Input() draws: Draw[] = [];

  constructor(private snowService: SnowService) {
  }

  ngAfterViewInit(): void {
    this.snowService.updateSnow();

  }
}
