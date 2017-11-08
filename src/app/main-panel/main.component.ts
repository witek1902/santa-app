import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs/Observable';
import {MarketService} from '../service/market.service';
import {SnowService} from "../service/snow.service";


@Component({
  selector: 'santa-main',
  template: `
    <santa-header></santa-header>
    <santa-draws></santa-draws>
    <santa-fab-button></santa-fab-button>
    <santa-modals></santa-modals>
    <!--<ul *ngFor="let market of markets | async">-->
    <!--<li>-->
    <!--<strong>{{ market.name}}</strong>-->
    <!--<br>-->
    <!--{{market.description}}-->
    <!--</li>-->
    <!--</ul>-->
  `
})
export class MainComponent implements OnInit, AfterViewInit {

  draws: Observable<Draw[]>;

  constructor(private authService: AuthService, private marketService: MarketService, private snowService: SnowService) {
  }

  ngOnInit() {
    this.draws = this.marketService.getMarkets();
  }

  ngAfterViewInit(): void {
    window.onresize = () => {
      this.snowService.updateSnow();
    };
  }
}
