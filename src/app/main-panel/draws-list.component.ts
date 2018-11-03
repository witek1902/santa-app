import {AfterViewInit, Component, Input} from '@angular/core';
import {SnowService} from '../service/snow.service';
import {Draw} from '../model/draw.interface';

@Component({
  selector: 'santa-draws-list',
  template: `
    <div class="col s12 m6">
      <santa-draw-search [placeholder]="searchPlaceholder" (onSearch)="onSearch($event)"></santa-draw-search>
      <h3 class="white-text center-align">{{title}}</h3>
      <div class="preloader-wrapper active" *ngIf="isLoading">
        <div class="spinner-layer">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <div *ngIf="!isLoading">
        <p class="white-text center-align" *ngIf="!draws || draws.length === 0">Nie znaleziono</p>
        <ng-container *ngFor="let draw of draws">
          <santa-draw-card
            *ngIf="!searchValue || draw?.name.toLowerCase().includes(searchValue)"
            [draw]="draw"
          ></santa-draw-card>
        </ng-container>
      </div>
    </div>
  `
})
export class DrawsListComponent implements AfterViewInit {
  @Input() title = '';
  @Input() searchPlaceholder = '';
  @Input() draws: Draw[] = [];
  @Input() isLoading = true;
  public searchValue = '';

  constructor(private snowService: SnowService) {
  }

  ngAfterViewInit(): void {
    this.snowService.updateSnow();
  }

  public onSearch(searchValue: string) {
    this.searchValue = searchValue.toLowerCase();
  }
}
