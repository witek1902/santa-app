import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth.service';

declare var $: any;

@Component({
  selector: 'santa-header',
  template: `
    <div class="navbar-fixed">
            <nav>
        <div class="nav-wrapper red darken-1">
          <a href="#" class="brand-logo">Santa App</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="https://github.com/arturczopek/santa-app" target="_blank">Check app <i class="fa fa-github"></i></a></li>
            <li><a (click)="showSantaModal()">Show me santa!</a></li>
            <li>
              <a class="dropdown-button" data-activates="user-dropdown">
                <!--<img src="{{(user | async)?.photoURL}}" class="circle responsive-img">-->
                {{(user | async)?.displayName}}
                <i class="material-icons right">arrow_drop_down</i>
                <ul id="user-dropdown" class="dropdown-content">
                  <li><a class="red-text text-darken-1" (click)="logout()">Wyloguj</a></li>
                </ul>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  `
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: Observable<firebase.User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }


  ngAfterViewInit(): void {
    $('.dropdown-button').dropdown();
  }

  showSantaModal() {
    console.log('not implemented');
  }

  logout() {
    this.authService.logout();
  }
}
