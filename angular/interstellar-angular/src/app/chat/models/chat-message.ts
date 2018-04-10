import { ChatUser } from "./chat-user";
import { ChatThread } from "./chat-thread";

export class ChatMessage {

    messageid: string;
    sentAt: Date; // TODO: FB TIMESTAMP???
    isRead: boolean;
    sender: ChatUser;
    reciever: ChatUser;
    text: string;
    thread: ChatThread;

    constructor(obj?: any) {
        this.messageid       = obj.messageid;
        this.isRead          = obj.isRead || false;
        this.sentAt          = obj.sentAt;
        this.sender          = obj.sender;
        this.reciever        = obj.reciever;
        this.text            = obj.text;
        this.thread          = obj.thread;
    }
}
