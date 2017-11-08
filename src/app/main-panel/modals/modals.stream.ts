import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ModalsStream {
  private onShowJoinModal: Subject<Draw> = new Subject<Draw>();
  private onShowDrawModal: Subject<Draw> = new Subject<Draw>();
  private onShowParticipantsModal: Subject<Draw> = new Subject<Draw>();
  private onShowNewDrawModal: Subject<any> = new Subject<any>();

  public getJoinModalStream(): Subject<Draw> {
    return this.onShowJoinModal;
  }

  public getDrawModalStream(): Subject<Draw> {
    return this.onShowDrawModal;
  }

  public getParticipantsModalStream(): Subject<Draw> {
    return this.onShowParticipantsModal;
  }

  public getNewDrawModalStream(): Subject<any> {
    return this.onShowNewDrawModal;
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

  public showNewDrawModal() {
    this.onShowNewDrawModal.next({});
  }
}
