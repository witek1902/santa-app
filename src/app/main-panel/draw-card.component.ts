import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'santa-draw-card',
  template: `
    <div class="row">
      <div class="col s10 offset-s1">
        <div class="card small blue lighten-5">
          <div class="card-content black-text">
        <span class="card-title">
          {{draw.name}}
          <span *ngIf="isActive()" class="new badge blue" data-badge-caption="ACTIVE"></span>
          <span *ngIf="isFinished()" class="new badge red" data-badge-caption="FINISHED"></span>
          <span *ngIf="draw.owner === (user | async).uid" class="new badge pink" data-badge-caption="OWNER"></span>
          <span *ngIf="draw.participants.indexOf((user | async).uid) > -1" class="new badge green"
                data-badge-caption="PARTICIPATE"></span>
        </span>
            <p>{{draw.description}}</p>
          </div>
          <div class="card-action">
            <a *ngIf="isActive() && draw.participants.indexOf((user | async).uid) < 0" href=""
               class="red-text darken-1">Join</a>
            <a *ngIf="isActive() && draw.owner === (user | async).uid" href=""
               class="red-text darken-1">Draw!</a>
            <a *ngIf="draw.participants.indexOf((user | async).uid) > -1" href=""
               class="red-text darken-1">Show participants</a>
            <a *ngIf="draw.participants.indexOf((user | async).uid) > -1 && isFinished()" href=""
               class="red-text darken-1">Show your winner</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DrawCardComponent implements OnInit {
  user: Observable<firebase.User>;
  @Input() draw: Draw;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.user.subscribe(
      user => console.log(user.uid)
    );
  }

  public isActive() {
    return this.draw.status === 'ACTIVE';
  }

  public isFinished() {
    return this.draw.status === 'FINISHED';
  }
}
