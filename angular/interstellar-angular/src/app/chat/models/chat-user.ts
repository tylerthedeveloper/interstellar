export class ChatUser {
    
    userFbID: string;
    userPublicKey: string;
    userName: string;
    fullName: string;

    constructor(obj: any) {
        this.userFbID       = obj.userFbID;
        this.userPublicKey  = obj.userPublicKey;
        this.userName       = obj.author;
        this.fullName       = obj.fullName;
    }
}