import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatThread } from '../../models/chat-thread';
import {  Location } from '@angular/common';
import { ChatService } from 'app/core/services';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'app/shared/components';
import { ChatMessage } from '../../models/chat-message';
import { BaseComponent } from 'app/base.component';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent extends BaseComponent implements OnInit {

    // TODO: https://loiane.com/2017/08/angular-tips-formatting-dates-with-a-custom-date-pipe-dd-mm-yyyy/
    // todo:    CACHE MESSAGES IN 2D ARRAY .....????

    private activeThreadUserID: string;
    private activeThreadID: string;
    // private activeThread: Observable<ChatThread>;
    private activeThread: ChatThread;
    private myChatThreads: Observable<ChatThread[]>;
    private activeThreadMessages: Observable<ChatMessage[]>;

    // private myUserID: string;
    private localChatThreads: ChatThread[];

    constructor(private _chatService: ChatService,
                private _route: ActivatedRoute,
                private location: Location,
                private dialog: MatDialog) {
                    super();
                    // console.log(this.myUserID)
                    // console.log(this.myPublicKey)
                }

        ngOnInit() {
            // this.myUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
            this.activeThreadUserID = this._route.snapshot.queryParams['receiverID'] || '';
            this.myChatThreads = this._chatService.getMyChatThreads()
                .map(threads => {
                    console.log(this.activeThreadUserID)
                    const foundCurrentThread = threads.find(thread => thread.receiverFbID === this.activeThreadUserID);
                    this.activeThreadID = (foundCurrentThread) ? foundCurrentThread.chatThreadID : '';
                    console.log(foundCurrentThread)
                    console.log(this.activeThreadID)
                    if (this.activeThreadUserID && !foundCurrentThread) {
                        this.handleNewChat();
                    } else if (this.activeThreadID && foundCurrentThread && this.activeThreadUserID) {
                        this.handleExistingChat(foundCurrentThread);
                    }
                    this.localChatThreads = threads;
                    return threads;
                });
            }


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @returns void
     */
    handleNewChat(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                    title: 'Contact New Seller',
                    content: 'It seems you have not contacted this person before, would you liek too?'
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                this._chatService.createNewChatThread(this.myUserID, this.activeThreadUserID);
            }
        });
    }

    /**
     * @returns void
     */
    handleExistingChat(currentThread: ChatThread): void {
        this.activeThreadUserID = currentThread.receiverFbID;
        this.activeThreadMessages = this._chatService.getMessagesForChat(this.activeThreadID);
        this.activeThread = currentThread;
    }

    /**
     * @param  {string} message
     * @returns void
     */
    sendMessage(message: string): void {
        if (!message || message === '') {
            alert('uh oh, looks liek you forgot to enter text');
            return;
        }
        console.log(this.activeThread)
        const messageObj = new ChatMessage({
            isRead: false,
            sentAt: Date.now(),
            sender: this.myUserID,
            reciever: this.activeThread.senderFbID,
            text: message,
            chatThreadID: this.activeThreadID
        });
        const _messageData = JSON.stringify(messageObj);
        this._chatService.sendMessage(this.activeThreadID, _messageData);
    }

    // ADDCHATHREAD() {
    //     if (!((sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id')) &&
    //          (sessionStorage.getItem('public_key') || localStorage.getItem('public_key')) &&
    //          (sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key')))) {
    //             alert('You must be logged in order to post a new product');
    //             return;
    //     }
    // }


    /**
     * @param  {string} product
     * @returns void
     */
    // onSelectChat(chatID: string, receiverChatID: string): void {
    onSelectChat(data: string): void {
        const _chatData = JSON.parse(data);
        const chatID = _chatData.threadID;
        this.activeThreadID = chatID;
        this.activeThreadUserID = _chatData.receiverID;
        // console.log(this.activeThreadID)
        // console.log(this.activeThreadUserID)
        const activeChatThread = this.localChatThreads.find(thread => thread.chatThreadID === chatID);
        if (activeChatThread) {
            this.activeThread = activeChatThread;
        }
        console.log(this.activeThread)        
        // TODO: make ordered by timestamp
        this.activeThreadMessages = this._chatService.getMessagesForChat(chatID);
        if (!this._route.snapshot.queryParams['receiverID']) {
            this.location.go('/chat', `?receiverID=${this.activeThreadUserID}`);
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
