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
import { HttpService } from './http.service';

@Injectable()
export class ChatService {

    /** API endpoint */
    private _chatRouteAPIUrl = 'api/chat';


    /** AFS Collections */
    private userChatThreadsCollection: AngularFirestoreCollection<User>;
    private chatThreadsCollection: AngularFirestoreCollection<ChatThread>;

    private userChatRef: firebase.firestore.CollectionReference;
    private chatThreadsRef: firebase.firestore.CollectionReference;

    public myChatThreads: Observable<ChatThread[]>;

    private _userID: string;

     constructor(private _httpService: HttpService,
                 private afs: AngularFirestore) {
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
        // return this.myChatThreads;
        const urlString = `${this._chatRouteAPIUrl}/threads/my-threads/${this._userID}`;
        return this._httpService.httpGetRequest(urlString)
                .map(myChatThreads => JSON.stringify(myChatThreads))
                .map(myChatThreads => <Array<ChatThread>> JSON.parse(myChatThreads));
    }

    getMessagesForChat(activeThreadID: string): Observable<ChatMessage[]> {
        // return this.chatThreadsCollection.doc(activeThreadID)
        //             .collection<ChatMessage>('chatMessages', ref => ref.orderBy('sentAt'))
        //             .valueChanges();
        const urlString = `${this._chatRouteAPIUrl}/threads/${activeThreadID}`;
        return this._httpService.httpGetRequest(urlString)
                .map(chatMessages => JSON.stringify(chatMessages))
                .map(chatMessages => <Array<ChatMessage>> JSON.parse(chatMessages));
    }

    createNewChatThread(senderID: string, receiverID: string) {
        // const NEWCHATID = 'NEWCHATID';
        const NEWCHATID = this.afs.createId();
        // const senderRef = this.userChatRef.doc(senderID).collection('chatThreads').doc(NEWCHATID);
        // const receiverRef = this.userChatRef.doc(receiverID).collection('chatThreads').doc(NEWCHATID);
        const chatThreadObj = <ChatThread> {
            chatThreadID: NEWCHATID,
            senderFbID: senderID,
            senderPublicKeyFbID: 'CHANGE ME',
            receiverFbID: receiverID,
            receiverPublicKeyFbID: 'CHANGE ME'
        };
        const urlString = `${this._chatRouteAPIUrl}/threads/`;
        return this._httpService.httpPostRequest(urlString, chatThreadObj)
                .then(res => console.log(res));
    }

    sendMessage(threadID: string, message: string) {
        const NEWMESSAGEID = this.afs.createId();
        const _messageObj = JSON.parse(message);
        _messageObj.messageid = NEWMESSAGEID;
        // _messageObj.sentAt = firebase.firestore.FieldValue.serverTimestamp();
        // this.chatThreadsCollection.doc(threadID).collection('chatMessages').doc(NEWMESSAGEID).set(_messageObj);
        const urlString = `${this._chatRouteAPIUrl}/threads/${threadID}`;
        return this._httpService.httpPostRequest(urlString, _messageObj)
                .then(res => console.log(res));
    }
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    // ────────────────────────────────────────────────────────────────────────────────
}

