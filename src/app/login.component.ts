import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'santa-login',
  template: `
    <div class="login-page">
      <div class="login-page__login-card grey lighten-2">
        <h1 class="mat-display-3" style="margin-bottom: 0;">Santa App</h1>
        <iframe width="400" height="255" src="https://www.youtube.com/embed/z59gAXZ0ksQ" frameborder="0"
                allowfullscreen></iframe>
        <div class="button-row">
          <a class="waves-effect waves-light btn-large social facebook" (click)="login()">
            <i class="fa fa-facebook"></i> Sign in with facebook</a>
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
