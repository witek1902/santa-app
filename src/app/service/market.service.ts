import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MarketService {

  constructor(private afs: AngularFirestore) {

  }

  getMarkets(): Observable<Draw[]> {
    const marketsCol: AngularFirestoreCollection<Draw> = this.afs.collection('draws');
    return marketsCol.valueChanges();
  }
}
