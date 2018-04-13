export class ChatThread {

    chatThreadID: string;

    senderFbID: string;
    senderPublicKeyFbID: string;

    receiverFbID: string;
    receiverPublicKeyFbID: string;

    constructor(obj?: any) {
        this.chatThreadID            = obj.chatThreadID;
        this.senderFbID             = obj.senderFbID;
        this.senderPublicKeyFbID    = obj.senderPublicKeyFbID;
        this.receiverFbID           = obj.receiverFbID;
        this.receiverPublicKeyFbID  = obj.receiverPublicKeyFbID;
    }
}
