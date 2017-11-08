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
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CardActionsComponent,
    CardTagsComponent,
    DrawCardComponent,
    DrawsComponent,
    DrawsListComponent,
    FabButtonComponent,
    HeaderComponent,
    JoinModalComponent,
    MainComponent,
    ModalsComponent
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
