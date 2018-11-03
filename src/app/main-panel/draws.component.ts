import {Component, OnInit} from '@angular/core';
import {Draw} from '../model/draw.interface';
import {DrawService} from '../service/draw.service';
import {SnowService} from '../service/snow.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'santa-draws',
  template: `
    <div class="container">
      <div class="row">
        <santa-draws-list
          [title]="'Dostępne losowania'"
          [searchPlaceholder]="'Szukaj wśród dostępnych losowań...'"
          [draws]="availableDraws"
          [isLoading]="isLoading"
        ></santa-draws-list>
        <santa-draws-list
          [title]="'Twoje losowania'"
          [searchPlaceholder]="'Szukaj wśród twoich losowań...'"
          [draws]="userDraws"
          [isLoading]="isLoading"
        ></santa-draws-list>
      </div>
    </div>
  `
})
export class DrawsComponent implements OnInit {

  public availableDraws: Draw[] = [];
  public userDraws: Draw[] = [];
  public isLoading = true;

  private uid = '';

  constructor(private drawService: DrawService, private snowService: SnowService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        if (user) {
          this.uid = user.uid;
          this.isLoading = true;
          this.drawService.getDraws()
            .subscribe(
              draws => {
                this.availableDraws = [];
                this.userDraws = [];
                draws.forEach(draw => {
                  if (draw.status === 'ACTIVE' && !draw.participants.some(pcp => pcp.uid === this.uid)) {
                    this.availableDraws.push(draw);
                  } else if (draw.participants.some(pcp => pcp.uid === this.uid)) {
                    this.userDraws.push(draw);
                  }
                });

                this.availableDraws = this.drawService.sortDraws(this.availableDraws);
                this.userDraws = this.drawService.sortDraws(this.userDraws);

                this.isLoading = false;
                setTimeout(() => {
                  this.snowService.updateSnow();
                }, 500);
              });
        }
      });
  }
}
