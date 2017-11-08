import {AfterViewInit, Component, Input} from '@angular/core';

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#snow').css('height', '100%');
      const snowHeight = $('body').height();
      $('#snow').css('height', snowHeight);
    });
  }
}
