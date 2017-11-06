import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  public getUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  public login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .catch(error => alert(`${error.message} Please try again`)
      );
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
