import {Component, OnInit} from '@angular/core';
import {ModalsStream} from './modals.stream';
import {BaseModal} from './base-modal.component';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'santa-video-modal',
  template: `
    <div id="video-modal" class="modal" materialize="modal" [materializeParams]="[modalParams]"
         [materializeActions]="modalActions">
      <div class="modal-content">
        <h4>Ho, ho, ho!</h4>
        <iframe *ngIf="showVideo" class="e2e-iframe-trusted-src" style="width: 100%;" height="315" width="420"
                frameborder="0" [src]="currentVideoUrl"
        ></iframe>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-red btn-flat" (click)="closeModal()">Zamknij</a>
      </div>
    </div>
  `
})
export class VideoModalComponent extends BaseModal implements OnInit {

  public showVideo = false;
  public currentVideoUrl: SafeUrl;

  private videosIds = [
    'z59gAXZ0ksQ',
    'fGRQJ_ZKvvU',
    'LPGTkkUx63M',
  ];

  private ytUrl = 'https://www.youtube.com/embed/';
  private paramsUrl = '?rel=0&controls=1&showinfo=0&autoplay=1';

  constructor(private modalsStream: ModalsStream, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.openModal$ = this.modalsStream.getVideoModalStream().subscribe(
      () => {
        this.openModal();
      }
    );
  }

  openModal() {
    super.openModal();
    this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.ytUrl +
      this.videosIds[Math.floor(Math.random() * this.videosIds.length)] +
      this.paramsUrl
    );
    this.showVideo = true;
  }

  closeModal() {
    this.showVideo = false;
    super.closeModal();
  }
}
