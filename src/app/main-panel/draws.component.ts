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
          [title]="'Available draws'"
          [draws]="availableDraws"
          [isLoading]="isLoading"
        ></santa-draws-list>
        <santa-draws-list
          [title]="'Your draws'"
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

              this.isLoading = false;
            });
      });

    setTimeout(() => {
      this.snowService.updateSnow();
    }, 3000);
  }

  // public mockAvailableDraws = [
  //   {id: 1, name: 'Av1', description: 'Av1', owner: 'notme', participants: ['xaxa', 'xexe'], status: 'ACTIVE'},
  //   {id: 2, name: 'Av2', description: 'Av2', owner: 'notme', participants: ['xaxa'], status: 'ACTIVE'},
  // ];
  //
  // public mockUserDraws = [
  //   {
  //     id: 3, name: 'Mock1', description: 'Mock1 Mock1 Mock1 Mock1 Mock1 Mock1 ', owner: 'qrGjDRcyfFhozeh6BXvcwFRpruk1',
  //     participants: ['qrGjDRcyfFhozeh6BXvcwFRpruk1', 'xexe'], status: 'ACTIVE'
  //   },
  //   {
  //     id: 5, name: 'Wielki mecz 2017', description: 'Mock3', owner: 'qrGjDRcyfFhozeh6BXvcwFRpruk1',
  //     participants: ['xoxox', 'xexex', 'qrGjDRcyfFhozeh6BXvcwFRpruk1'], status: 'FINISHED'
  //   },
  //   {
  //     id: 4, name: 'Mock2', description: 'Mock2 Mock2 Mock2 Mock2', owner: 'notme',
  //     participants: ['xaxa', 'qrGjDRcyfFhozeh6BXvcwFRpruk1'], status: 'ACTIVE'
  //   }
  // ];
}
