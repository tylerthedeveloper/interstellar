import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatThread } from '../../models/chat-thread';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {

    @Input() chatThread: ChatThread;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    selectChat = (chatThreadID: string) => {
        const data = {
            threadID: this.chatThread.chatThreadID,
            receiverID: this.chatThread.receiverFbID
        };
        this.notify.emit(JSON.stringify(data));
    }

}
