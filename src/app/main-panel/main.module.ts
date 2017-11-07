import {MainComponent} from './main.component';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from 'angular2-materialize';
import {NgModule} from '@angular/core';
import {DrawsComponent} from './draws.component';
import {DrawsListComponent} from './draws-list.component';
import {DrawCardComponent} from './draw-card.component';
import {CardTagsComponent} from './card-tags.component';
import {CardActionsComponent} from './card-actions.component';

@NgModule({
  declarations: [
    CardActionsComponent,
    CardTagsComponent,
    DrawCardComponent,
    DrawsComponent,
    DrawsListComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MaterializeModule,
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
