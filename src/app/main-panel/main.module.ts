import {MainComponent} from './main.component';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from 'angular2-materialize';
import {NgModule} from '@angular/core';
import {DrawsComponent} from './draws.component';
import {DrawsListComponent} from './draws-list.component';
import {DrawCardComponent} from './card/draw-card.component';
import {CardTagsComponent} from './card/draw-card-tags.component';
import {CardActionsComponent} from './card/draw-card-actions.component';
import {FabButtonComponent} from './fab-button.component';
import {JoinModalComponent} from './modals/join-modal.component';
import {ModalsComponent} from './modals/modals.component';
import {FormsModule} from '@angular/forms';
import {DrawModalComponent} from './modals/draw-modal.component';
import {ParticipantsModalComponent} from './modals/participants-modal.component';
import {WinnerModalComponent} from './modals/winner-modal.component';
import {NewDrawModalComponent} from './modals/new-draw-modal.component';
import {VideoModalComponent} from './modals/video-modal.component';
import {MessageModalComponent} from './modals/message-modal.component';

@NgModule({
  declarations: [
    CardActionsComponent,
    CardTagsComponent,
    DrawCardComponent,
    DrawModalComponent,
    DrawsComponent,
    DrawsListComponent,
    FabButtonComponent,
    HeaderComponent,
    JoinModalComponent,
    MainComponent,
    MessageModalComponent,
    ModalsComponent,
    NewDrawModalComponent,
    ParticipantsModalComponent,
    WinnerModalComponent,
    VideoModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
