import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatThread } from '../../models/chat-thread';
import { ChatService } from 'app/core/services';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {


    private currentThread: Observable<ChatThread>;
    private myChatThreads: Observable<ChatThread[]>;

    constructor(private _chatService: ChatService) {}

    ngOnInit() {
        this.myChatThreads = this._chatService.getMyChatThreads();
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

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //


    /**
     * @param  {string} product
     * @returns void
     */
    onSelectChat(chatID: string): void {
      // this.currentThread = chatID;
      // focus on chat on right side
    }
    // ────────────────────────────────────────────────────────────────────────────────
}


}
