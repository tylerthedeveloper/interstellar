//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 * TODO:
 * STATE MANAGEMENT ... ALL SERVICES
 */
//
/** Angular */
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

/** Firebase */
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

/** Models */
import { ChatThread } from 'app/chat/models/chat-thread';
import { ChatMessage } from '../../chat/models/chat-message';
import { User } from 'app/user/user';

@Injectable()
export class ChatService {

    /** AFS Collections */
    private userChatThreadsCollection: AngularFirestoreCollection<User>;
    private chatThreadsCollection: AngularFirestoreCollection<ChatThread>;

    private userChatRef: firebase.firestore.CollectionReference;
    private chatThreadsRef: firebase.firestore.CollectionReference;

    public myChatThreads: Observable<ChatThread[]>;

    private _userID: string;

     constructor(private afs: AngularFirestore) {
        const userID: string = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this._userID = userID;
        if (userID) {
            this.userChatThreadsCollection = afs.collection<User>('user-chat-threads');
            this.userChatRef = this.userChatThreadsCollection.ref;

            this.chatThreadsCollection = afs.collection<ChatThread>('chat-threads');
            this.chatThreadsRef = this.chatThreadsCollection.ref;

            this.myChatThreads = this.userChatThreadsCollection.doc(userID).collection<ChatThread>('chatThreads').valueChanges();
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

    getMessagesForChat(activeThreadID: string): Observable<ChatMessage[]> {
        return this.chatThreadsCollection.doc(activeThreadID)
                    .collection<ChatMessage>('chatMessages', ref => ref.orderBy('sentAt'))
                    .valueChanges();

    }

    createNewChatThread(senderID: string, receiverID: string) {
        // const NEWCHATID = 'NEWCHATID';
        const NEWCHATID = this.afs.createId();
        const senderRef = this.userChatRef.doc(senderID).collection('chatThreads').doc(NEWCHATID);
        const receiverRef = this.userChatRef.doc(receiverID).collection('chatThreads').doc(NEWCHATID);
        // const senderRef = this.userChatRef.doc(senderID).collection('chatThreads').doc(receiverID);
        // const receiverRef = this.userChatRef.doc(receiverID).collection('chatThreads').doc(senderID);
        const chatThreadObj = <ChatThread> {
            chatThreadID: NEWCHATID,
            senderFbID: senderID,
            senderPublicKeyFbID: 'CHANGE ME',
            receiverFbID: receiverID,
            receiverPublicKeyFbID: 'CHANGE ME'
        };
        const batch = this.afs.firestore.batch();
        batch.set(senderRef, chatThreadObj);
        batch.set(receiverRef, chatThreadObj);
        batch.set(this.chatThreadsRef.doc(chatThreadObj.chatThreadID), chatThreadObj);
        return batch.commit();
        // .catch(this.HandleError);
        // .then(res => res)
        // .map()
    }

    sendMessage(threadID: string, message: string) {
        const NEWMESSAGEID = this.afs.createId();
        const _messageObj = JSON.parse(message);
        _messageObj.messageid = NEWMESSAGEID;
        // _messageObj.sentAt = firebase.firestore.FieldValue.serverTimestamp();
        this.chatThreadsCollection.doc(threadID).collection('chatMessages').doc(NEWMESSAGEID).set(_messageObj);
    }
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    // ────────────────────────────────────────────────────────────────────────────────
}

