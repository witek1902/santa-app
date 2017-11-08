import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class SnowService {

  public updateSnow() {
    $('#snow').css('height', '100%');
    $('#snow').css('width', '100%');
    const snowHeight = $('body').height();
    const snowWidth = $('body').width();
    $('#snow').css('height', snowHeight);
    $('#snow').css('width', snowWidth);
  }
}
