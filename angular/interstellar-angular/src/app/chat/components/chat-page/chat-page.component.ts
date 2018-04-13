import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatThread } from '../../models/chat-thread';
import { ChatService } from 'app/core/services';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'app/shared/_components';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {


    private activeThreadID: string;
    private activeThread: Observable<ChatThread>;
    private myChatThreads: Observable<ChatThread[]>;
    private myUserID: string;

    constructor(private _chatService: ChatService,
                private _route: ActivatedRoute,
                private dialog: MatDialog) {}

        ngOnInit() {
            // activeThreadID
            this.myUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');

            this.activeThreadID = this._route.snapshot.queryParams['receiverID'];
            this.myChatThreads = this._chatService.getMyChatThreads()
                .map(threads => {
                    // console.log(this.activeThreadID)
                    if (this.activeThreadID && !threads.find(thread => thread.receiverFbID === this.activeThreadID)) {
                        this.handleNewChat();
                    }
                    return threads;
            });
        }


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    handleNewChat(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                    title: 'Contact New Seller',
                    content: 'It seems you have not contacted this person before, would you liek too?'
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                // console.log(result);
                this._chatService.createNewChatThread(this.myUserID, this.activeThreadID);
            }
        });
    }

    // TODO: Remove
    ADDCHATHREAD() {
        if (!((sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id')) &&
             (sessionStorage.getItem('public_key') || localStorage.getItem('public_key')) &&
             (sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key')))) {
                alert('You must be logged in order to post a new product');
                return;
        }
    }



    /**
     * @param  {string} product
     * @returns void
     */
    onSelectChat(chatID: string): void {
        this.activeThreadID = chatID;
        console.log(chatID);
        // this.activeThread = this.myChatThreads.first(thread => thread.;
      // focus on chat on right side
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
