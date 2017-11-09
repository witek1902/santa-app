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
        this.userEntry = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
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
    this.userEntry = null;
  }

  public getCurrentUserEntry(): UserEntry {
    return this.userEntry;
  }
}
