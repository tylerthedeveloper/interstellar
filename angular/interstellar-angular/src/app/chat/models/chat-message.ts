import { ChatThread } from './chat-thread';
import { ChatUser } from './chat-user';

export class ChatMessage {

    messageid: string;
    sentAt: Date;
    isRead: boolean;
    sender: ChatUser;
    reciever: ChatUser;
    text: string;
    // thread: ChatThread;
    chatThreadID: string;

    constructor(obj?: any) {
        this.isRead          = obj.isRead || false;
        this.sender          = obj.sender;
        this.reciever        = obj.reciever;
        this.text            = obj.text;
        this.chatThreadID    = obj.chatThreadID;
    }
}
