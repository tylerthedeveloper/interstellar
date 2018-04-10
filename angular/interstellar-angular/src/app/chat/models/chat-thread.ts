export class ChatThread {

    chatTheadID: string;

    senderFbID: string;
    senderPublicKeyFbID: string;

    receiverFbID: string;
    receiverPublicKeyFbID: string;

    constructor(obj?: any) {
        this.chatTheadID            = obj.chatTheadID;
        this.senderFbID             = obj.senderFbID;
        this.senderPublicKeyFbID    = obj.senderPublicKeyFbID;
        this.receiverFbID           = obj.receiverFbID;
        this.receiverPublicKeyFbID  = obj.receiverPublicKeyFbID;
    }
}
