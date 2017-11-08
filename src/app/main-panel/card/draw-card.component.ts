import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
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
          <santa-draw-card-tags
            [isActive]="isActive()"
            [isFinished]="isFinished()"
            [isOwner]="draw.owner === (user | async)?.uid"
            [isParticipant]="draw.participants.indexOf((user | async)?.uid) > -1"
          ></santa-draw-card-tags>
        </span>
            <p>{{draw.description}}</p>
          </div>
          <santa-draw-card-actions
            [canJoin]="isActive() && draw.participants.indexOf((user | async)?.uid) < 0"
            [canDraw]="isActive() && draw.owner === (user | async)?.uid"
            [canSeeParticipants]="draw.participants.indexOf((user | async)?.uid) > -1"
            [canSeeWinner]="draw.participants.indexOf((user | async)?.uid) > -1 && isFinished()"
            [draw]="draw"
          ></santa-draw-card-actions>
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
