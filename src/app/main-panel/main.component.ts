import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs/Observable';
import {MarketService} from '../service/market.service';

@Component({
  selector: 'santa-main',
  template: `
    <santa-header></santa-header>
    <santa-draws></santa-draws>
    <!--<ul *ngFor="let market of markets | async">-->
      <!--<li>-->
        <!--<strong>{{ market.name}}</strong>-->
        <!--<br>-->
        <!--{{market.description}}-->
      <!--</li>-->
    <!--</ul>-->
  `
})
export class MainComponent implements OnInit {

  draws: Observable<Draw[]>;

  constructor(private authService: AuthService, private marketService: MarketService) {
  }

  ngOnInit() {
    this.draws = this.marketService.getMarkets();
  }
}
