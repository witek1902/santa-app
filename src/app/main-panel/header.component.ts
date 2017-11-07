import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'santa-header',
  template: `
    <div class="navbar-fixed">
      <ul id="dropdown1" class="dropdown-content">
        <li><a (click)="logout()">Wyloguj</a></li>
      </ul>
      <nav>
        <div class="nav-wrapper red darken-1">
          <a href="#!" class="brand-logo">Santa App</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="sass.html">Show me santa!</a></li>
            <li *ngIf="(user | async)?.uid">
              <a class="dropdown-button" href="#!" data-activates="dropdown1">
                <img src="{{(user | async)?.photoURL}}" style="width:30px;height:30px;">
                {{(user | async)?.displayName}}
                <i class="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  `
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
