import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {LoginComponent} from './login.component';
import {AuthService} from './service/auth.service';
import {DrawService} from './service/draw.service';
import {MaterializeModule} from 'angular2-materialize';
import {MainModule} from './main-panel/main.module';
import {ModalsStream} from './main-panel/modals/modals.stream';
import {SnowService} from './service/snow.service';
import {MessageService} from "./service/message.service";

export const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  databaseURL: environment.databaseURL,
  projectId: environment.projectId,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterializeModule,
    MainModule
  ],
  providers: [
    AuthService,
    DrawService,
    ModalsStream,
    MessageService,
    SnowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


