import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs/Observable';
import {DrawService} from '../service/draw.service';
import {SnowService} from '../service/snow.service';
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
export class MainComponent implements OnInit, AfterViewInit {

  draws: Observable<Draw[]>;

  constructor(private authService: AuthService, private drawService: DrawService, private snowService: SnowService) {
  }

  ngOnInit() {
    this.draws = this.drawService.getDraws();
  }

  ngAfterViewInit(): void {
    window.onresize = () => {
      this.snowService.updateSnow();
    };
  }
}
