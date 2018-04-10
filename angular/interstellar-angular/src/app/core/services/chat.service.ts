//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 * TODO:
 * STATE MANAGEMENT ... ALL SERVICES
 */
//

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { ChatThread } from 'app/chat/models/chat-thread';
import { ChatMessage } from '../../chat/models/chat-message';
import { User } from 'app/user/user';



@Injectable()
export class ChatService {

    /** AFS Collections */
    public userChatThreadsCollection: AngularFirestoreCollection<ChatThread>;
    public chatThreadsCollection: AngularFirestoreCollection<ChatThread>;

    public myChatThreads: Observable<ChatThread[]>;

    // firebase.firestore.CollectionReference;

     private _userID: string;

     constructor(private afs: AngularFirestore) {
        const userID: string = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this._userID = userID;
        if (userID) {
            this.userChatThreadsCollection = afs.collection<User>('user-chat-threads').doc(userID).collection<ChatThread>('chatThreads');
            this.chatThreadsCollection = afs.collection<ChatThread>('chat-threads');
            this.myChatThreads = this.userChatThreadsCollection.valueChanges();
            // this.chatMessagesCollection = afs.collection('user-chat-rooms');

        }
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    getMyChatThreads(): Observable<ChatThread[]> {
        return this.myChatThreads;
    }

    getMessagesForChat(): Observable<ChatMessage[]> {
        return;
    }
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    // ────────────────────────────────────────────────────────────────────────────────
}

