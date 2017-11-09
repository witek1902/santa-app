import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Draw} from '../model/draw.interface';
import * as CryptoJS from 'crypto-js';
import {AuthService} from './auth.service';

@Injectable()
export class DrawService {

  private drawsCollection: AngularFirestoreCollection<Draw>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.drawsCollection = this.afs.collection('draws');
  }

  getDraws(): Observable<Draw[]> {
    return this.drawsCollection.valueChanges();
  }

  joinToDraw(draw: Draw, password: string): boolean {
    if (draw.participants.some(pcp => pcp.uid === this.authService.getCurrentUserEntry().uid)) {
      return false;
    }

    if (draw.status !== 'ACTIVE') {
      return false;
    }

    if (draw.password !== CryptoJS.MD5(password).toString()) {
      return false;
    }

    draw.participants.push(this.authService.getCurrentUserEntry());

    this.drawsCollection.ref.where('id', '==', draw.id).get()
      .then(snap => snap.forEach(x => {
          this.drawsCollection.doc(x.id).set(draw);
        })
      );

    return true;
  }
}
