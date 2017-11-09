import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Draw} from '../model/draw.interface';
import * as CryptoJS from 'crypto-js';
import {AuthService} from './auth.service';
import {UserEntry} from '../model/user-entry.interface';

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
      .then(snap => snap.forEach(doc => {
          this.drawsCollection.doc(doc.id).set(draw);
        })
      );

    return true;
  }

  createDraw({name, description, password}): boolean {
    const draw = {
      id: '' + Date.now(),
      name,
      description,
      owner: this.authService.getCurrentUserEntry(),
      participants: [this.authService.getCurrentUserEntry()],
      pairs: [],
      password: CryptoJS.MD5(password).toString(),
      status: 'ACTIVE'
    };

    this.drawsCollection.add(draw);

    return true;
  }

  getWinner(draw: Draw): Promise<UserEntry> {
    return this.drawsCollection.ref.where('id', '==', draw.id).get()
      .then(snap => {
          let winner: UserEntry;

          snap.forEach(x => {
            winner = x.data().pairs.filter(pair => pair.from.uid === this.authService.getCurrentUserEntry().uid)[0].to;
          });

          return winner;
        }
      );
  }

  startDraw(draw: Draw, password: string): boolean {
    console.log('start');

    if (draw.owner.uid !== this.authService.getCurrentUserEntry().uid) {
      console.log('wrong user');
      return false;
    }

    if (draw.status !== 'ACTIVE') {
      console.log('not active');
      return false;
    }

    if (draw.password !== CryptoJS.MD5(password).toString()) {
      console.log('wrong pass');
      return false;
    }

    if (draw.participants.length < 2) {
      console.log('malo...');
    }

    let finalPairs = [];


    let isOk = false;

    do {
      finalPairs = [];
      const possibleFrom = [...draw.participants];
      const possibleTo = [...draw.participants];

      console.log('arrays', finalPairs, possibleFrom, possibleTo);

      for (let i = draw.participants.length - 1; i >= 0; i--) {

        console.log('start:', i);

        if (i === 0) {
          console.log('last');
          if (possibleFrom[0].uid !== possibleTo[0].uid) {
            finalPairs.push({
              from: possibleFrom[0],
              to: possibleTo[0]
            });

            console.log('ok, pairs', finalPairs, i);

            isOk = true;
          } else {
            console.log('not ok, finish');
            isOk = false;
          }
        } else {

          const pair = {
            from: possibleFrom[i],
            to: null
          };

          let randomTo = Math.floor(Math.random() * possibleFrom.length);

          console.log('random to', randomTo);

          if (possibleFrom[i].uid === possibleTo[randomTo].uid) {
            console.log('duplicated users', possibleFrom[i], possibleTo[randomTo]);
            randomTo = (randomTo + 1) % possibleTo.length;
            console.log('new user', possibleTo[randomTo]);
          }

          pair.to = possibleTo[randomTo];
          finalPairs.push(pair);

          possibleFrom.splice(i, 1);
          possibleTo.splice(randomTo, 1);
          console.log('spliced', possibleFrom, possibleTo);
        }
      }
    } while (!isOk);

    draw.pairs = finalPairs;
    draw.status = 'FINISHED';

    this.drawsCollection.ref.where('id', '==', draw.id).get()
      .then(snap => snap.forEach(doc => {
          this.drawsCollection.doc(doc.id).set(draw);
        })
      );

    return true;
  }
}
