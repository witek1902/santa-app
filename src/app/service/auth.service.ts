import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {UserEntry} from '../model/user-entry.interface';

@Injectable()
export class AuthService {

  private userEntry: UserEntry = null;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(
      user => {
        if (user && user.uid && user.displayName && user.photoURL) {
          const {uid, displayName, photoURL} = user;
          this.userEntry = {uid, displayName, photoURL};
        } else {
          this.userEntry = null;
        }
      }
    );
  }

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

  public getCurrentUserEntry(): UserEntry {
    if (!this.userEntry && this.afAuth.auth.currentUser) {
      const {uid, displayName, photoURL} = this.afAuth.auth.currentUser;
      this.userEntry = {uid, displayName, photoURL};
    }

    if (this.userEntry) {
      return this.userEntry;
    }

    return null;
  }
}
