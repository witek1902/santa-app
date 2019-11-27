import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs/Observable';
import {DrawService} from '../service/draw.service';
import {Draw} from '../model/draw.interface';


@Component({
  selector: 'santa-main',
  template: `
    <santa-header></santa-header>
    <santa-draws></santa-draws>
    <santa-fab-button></santa-fab-button>
    <santa-modals></santa-modals>
  `
})
export class MainComponent implements OnInit {

  draws: Observable<Draw[]>;

  constructor(private authService: AuthService, private drawService: DrawService) {
  }

  ngOnInit() {
    this.draws = this.drawService.getDraws();
  }
}
