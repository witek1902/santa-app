import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'santa-login',
  template: `
    <div class="login-page">
      <div class="login-page__login-card">
        <h1 class="mat-display-3" style="margin-bottom: 0;">Santa App</h1>

        <iframe width="460" height="255" src="https://www.youtube.com/embed/z59gAXZ0ksQ" frameborder="0"
                allowfullscreen></iframe>
        <div class="button-row">
          <button class="login-page__login-button" mat-raised-button (click)="login()" *ngIf="!(user | async)?.uid">Fb
            Login
          </button>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }
}
