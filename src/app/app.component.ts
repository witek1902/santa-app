import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {AuthService} from './service/auth.service';
import {UserEntry} from "./model/user-entry.interface";

@Component({
  selector: 'santa-root',
  template: `
    <div id="snow"></div>
    <santa-login *ngIf="!authService.getCurrentUserEntry()?.uid"></santa-login>
    <santa-main *ngIf="authService.getCurrentUserEntry()?.uid"></santa-main>
  `
})
export class AppComponent {

  // userEntry: UserEntry;

  constructor(public authService: AuthService) {
  }

  // ngOnInit() {
  //   this.userEntry = this.authService.getCurrentUserEntry();
  // }
}
