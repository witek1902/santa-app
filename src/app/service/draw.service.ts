import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Draw} from '../model/draw.interface';
import * as CryptoJS from 'crypto-js';
import {AuthService} from './auth.service';
import {UserEntry} from '../model/user-entry.interface';
import {DrawResult} from '../model/draw-result.interface';

@Injectable()
export class DrawService {

  private drawsCollection: AngularFirestoreCollection<Draw>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.drawsCollection = this.afs.collection('draws');
  }

  getDraws(): Observable<Draw[]> {
    return this.drawsCollection.valueChanges();
  }

  sortDraws(draws: Draw[]): Draw[] {
    return draws.sort((a, b) => (a.status > b.status) ? 1 : -1);
  }

  joinToDraw(draw: Draw, password: string, wish?: string): boolean {
    if (draw.participants.some(pcp => pcp.uid === this.authService.getCurrentUserEntry().uid)) {
      return false;
    }

    if (draw.status !== 'ACTIVE') {
      return false;
    }

    if (draw.password !== CryptoJS.MD5(password).toString()) {
      return false;
    }

    const currentUser = this.authService.getCurrentUserEntry();
    currentUser.wish = wish;

    draw.participants.push(currentUser);

    this.drawsCollection.ref.where('id', '==', draw.id).get()
      .then(snap => snap.forEach(doc => {
          this.drawsCollection.doc(doc.id).set(draw);
        })
      );

    return true;
  }

  createDraw({name, description, password, moneyLimit, wish}): boolean {
    const currentUser = this.authService.getCurrentUserEntry();
    currentUser.wish = wish;
    const draw = {
      id: '' + Date.now(),
      name,
      description,
      owner: this.authService.getCurrentUserEntry(),
      participants: [currentUser],
      pairs: [],
      password: CryptoJS.MD5(password).toString(),
      status: 'ACTIVE',
      moneyLimit
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

  startDraw(draw: Draw, password: string): DrawResult {

    if (draw.owner.uid !== this.authService.getCurrentUserEntry().uid) {
      return {success: false, errorMessage: 'It is not an owner!'};
    }

    if (draw.status !== 'ACTIVE') {
      return {success: false, errorMessage: 'Market is not active!'};
    }

    if (draw.password !== CryptoJS.MD5(password).toString()) {
      return {success: false, errorMessage: 'Wrong password!'};
    }

    if (draw.participants.length < 2) {
      return {success: false, errorMessage: 'To less participants!'};
    }

    let finalPairs = [];


    let isOk = false;

    do {
      finalPairs = [];
      const possibleFrom = [...draw.participants];
      const possibleTo = [...draw.participants];


      for (let i = draw.participants.length - 1; i >= 0; i--) {
        if (i === 0) {
          if (possibleFrom[0].uid !== possibleTo[0].uid) {
            finalPairs.push({
              from: possibleFrom[0],
              to: possibleTo[0]
            });
            isOk = true;
          } else {
            isOk = false;
          }
        } else {

          const pair = {
            from: possibleFrom[i],
            to: null
          };

          let randomTo = Math.floor(Math.random() * possibleFrom.length);

          if (possibleFrom[i].uid === possibleTo[randomTo].uid) {
            randomTo = (randomTo + 1) % possibleTo.length;
          }

          pair.to = possibleTo[randomTo];
          finalPairs.push(pair);

          possibleFrom.splice(i, 1);
          possibleTo.splice(randomTo, 1);
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

    return {success: true};
  }
}
