import {Component} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'santa-login',
  template: `
    <div class="login-page">
      <div class="login-page__login-card grey lighten-2">
        <h1 class="mat-display-3" style="margin-bottom: 0;">Losowanie</h1>
        <div class="button-row">
          <a class="waves-effect waves-light btn-large social facebook" (click)="login()">
            <i class="fa fa-facebook"></i> Zaloguj przez FB</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login();
  }
}
