import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {LoginComponent} from './login.component';
import {AuthService} from './service/auth.service';
import {MarketService} from './service/market.service';
import {MaterializeModule} from 'angular2-materialize';
import {MainModule} from './main-panel/main.module';

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
    MarketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


