import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'santa-root',
  template: `
    <div id="snow"></div>
    <santa-fork></santa-fork>
    <santa-login *ngIf="!(user | async)?.uid"></santa-login>
    <santa-main *ngIf="(user | async)?.uid"></santa-main>
  `
})
export class AppComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
