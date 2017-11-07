import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {MarketService} from '../service/market.service';

@Component({
  selector: 'santa-main',
  template: `
    <santa-header></santa-header>
    <ul *ngFor="let market of markets | async">
      <li>
        <strong>{{ market.name}}</strong>
        <br>
        {{market.description}}
      </li>
    </ul>
  `
})
export class MainComponent implements OnInit {

  markets: Observable<Market[]>;

  constructor(private authService: AuthService, private marketService: MarketService) {
  }

  ngOnInit() {
    this.markets = this.marketService.getMarkets();
  }
}
