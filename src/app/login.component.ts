import {Component} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'santa-login',
  template: `
    <div class="login-page">
      <div class="login-page__login-card grey lighten-2">
        <h1 class="mat-display-3" style="margin-bottom: 0;">Santa App</h1>
        <iframe style="width: 98%;" width="400" height="255" frameborder="0" allowfullscreen
                src="https://www.youtube.com/embed/z59gAXZ0ksQ?rel=0&showinfo=0&autoplay=1"
        ></iframe>
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
