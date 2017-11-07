import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {LoginComponent} from './login.component';
import {MainComponent} from './main-panel/main.component';
import {AuthService} from './service/auth.service';
import {MarketService} from './service/market.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCardModule} from "@angular/material";
import {ForkMeComponent} from "./fork-me.component";

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
    ForkMeComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    MarketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


