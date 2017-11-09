import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Draw} from '../../model/draw.interface';

@Injectable()
export class ModalsStream {
  private onShowJoinModal: Subject<Draw> = new Subject<Draw>();
  private onShowDrawModal: Subject<Draw> = new Subject<Draw>();
  private onShowParticipantsModal: Subject<Draw> = new Subject<Draw>();
  private onShowWinnerModal: Subject<Draw> = new Subject<Draw>();
  private onShowNewDrawModal: Subject<any> = new Subject<any>();
  private onShowVideoModal: Subject<any> = new Subject<any>();

  public getJoinModalStream(): Subject<Draw> {
    return this.onShowJoinModal;
  }

  public getDrawModalStream(): Subject<Draw> {
    return this.onShowDrawModal;
  }

  public getParticipantsModalStream(): Subject<Draw> {
    return this.onShowParticipantsModal;
  }

  public getWinnerModalStream(): Subject<Draw> {
    return this.onShowWinnerModal;
  }

  public getNewDrawModalStream(): Subject<any> {
    return this.onShowNewDrawModal;
  }

  public getVideoModalStream(): Subject<any> {
    return this.onShowVideoModal;
  }

  public showJoinModal(draw: Draw) {
    this.onShowJoinModal.next(draw);
  }

  public showDrawModal(draw: Draw) {
    this.onShowDrawModal.next(draw);
  }

  public showParticipantsModal(draw: Draw) {
    this.onShowParticipantsModal.next(draw);
  }

  public showWinnerModal(draw: Draw) {
    this.onShowWinnerModal.next(draw);
  }

  public showNewDrawModal() {
    this.onShowNewDrawModal.next({});
  }

  public showVideoModal() {
    this.onShowVideoModal.next({});
  }
}
