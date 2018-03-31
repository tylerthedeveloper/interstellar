import { AssetBalance } from '../';

export class TransactionRecord {
    senderPublicKey: string;
    receiverPublicKey: string;
    assetBalance: AssetBalance;
    memo: string;
    // amount: string;
    // asset_type: string;

    // constructor(senderPublicKey: string,
    //             receiverPublicKey: string,
    //             amount: string,
    //             asset_type: string) {
    //                 this.senderPublicKey = senderPublicKey;
    //                 this.receiverPublicKey = receiverPublicKey;
    //                 this.amount = amount;
    //                 this.asset_type = asset_type;
    // }


    // CONVERT TO ASSET BALANCE. ,...
    constructor(senderPublicKey: string,
        receiverPublicKey: string,
        assetBalance: AssetBalance,
        memo: string) {
            this.senderPublicKey = senderPublicKey;
            this.receiverPublicKey = receiverPublicKey;
            this.assetBalance = assetBalance;
            this.memo = memo;
    }

}
