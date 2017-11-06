
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {MarketService} from '../service/market.service';

@Component({
  selector: 'santa-main',
  template: `
    <div class="row columns">
      <div *ngIf="(user | async)?.uid">
        <img src="{{(user | async)?.photoURL}}" style="width:30px;height:30px;">
        <br> Email: {{(user | async)?.email}}
        <br> Name: {{(user | async)?.displayName}}
      </div>
      <button (click)="logout()" *ngIf="(user | async)?.uid">Logout</button>
    </div>
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

  user: Observable<firebase.User>;
  markets: Observable<Market[]>;

  constructor(private authService: AuthService, private marketService: MarketService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.markets = this.marketService.getMarkets();
  }

  logout() {
    this.authService.logout();
  }
}
