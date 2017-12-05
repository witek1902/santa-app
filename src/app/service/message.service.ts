import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Message} from '../model/message.interface';
import {AuthService} from './auth.service';

@Injectable()
export class MessageService {

  private messagesCollection: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.messagesCollection = this.afs.collection('messages');
  }

  sendMessage(text: string): boolean {
    const message = {
      id: '' + Date.now(),
      author: this.authService.getCurrentUserEntry(),
      text: text
    };

    this.messagesCollection.add(message);

    return true;
  }
}
