import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Draw} from '../../model/draw.interface';

@Component({
  selector: 'santa-draw-card',
  template: `
    <div class="row">
      <div class="col xl10 offset-xl1 s12">
        <div class="card small blue lighten-5">
          <div class="card-content black-text">
        <span class="card-title">
          {{draw.name}}
          <santa-draw-card-tags
            [isActive]="isActive()"
            [isFinished]="isFinished()"
            [isOwner]="isOwner"
            [isParticipant]="isParticipant"
          ></santa-draw-card-tags>
        </span>
            <p>{{draw.description}}</p>
          </div>
          <santa-draw-card-actions
            [canJoin]="isActive() && !isParticipant"
            [canDraw]="isActive() && isOwner"
            [canSeeParticipants]="isParticipant"
            [canSeeWinner]="isParticipant && isFinished()"
            [draw]="draw"
          ></santa-draw-card-actions>
        </div>
      </div>
    </div>
  `
})
export class DrawCardComponent implements OnInit {
  @Input() draw: Draw;

  public isParticipant = false;
  public isOwner = false;

  user: Observable<firebase.User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.user.subscribe(
      user => {
        if (user && user.uid) {
          this.isParticipant = this.draw.participants.some(pcp => pcp.uid === user.uid);
          this.isOwner = this.draw.owner.uid === user.uid;
        } else {
          this.isParticipant = false;
          this.isOwner = false;
        }
      }
    );
  }

  public isActive() {
    return this.draw.status === 'ACTIVE';
  }

  public isFinished() {
    return this.draw.status === 'FINISHED';
  }
}
