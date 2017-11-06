import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MarketService {

  constructor(private afs: AngularFirestore) {

  }

  getMarkets(): Observable<Market[]> {
    const marketsCol: AngularFirestoreCollection<Market> = this.afs.collection('markets');
    return marketsCol.valueChanges();
  }
}
