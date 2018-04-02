import { AssetBalance } from 'app/stellar';
import { Product } from 'app/marketplace/_market-models/product';

export class TransactionGroup {

    transactionID: string;
    timestamp: string;

    transactionRecords: Array<TransactionRecord>;
    transactionPaymentDetails: TransactionPaymentDetails;


    constructor(transactionRecords: Array<TransactionRecord>) {
                this.transactionRecords = transactionRecords;
    }
}


export class TransactionRecord {

    // TODO: below 2.....
    transactionID: string;
    timestamp: string;

    buyerUserID: string;
    senderPublicKey: string;
    sellerUserID: string;
    receiverPublicKey: string;
    assetPurchaseDetails: AssetBalance;
    memo: string;


    productID: string;
    productName: string;
    productShortDescription: string;
    quantityPurchased: number;
    fixedUSDAmount: number;

    constructor(
            // trans details //
                buyerUserID: string,
                senderPublicKey: string,
                sellerUserID: string,
                receiverPublicKey: string,
                assetPurchaseDetails: AssetBalance,
                memo: string,
            // product details //
                productID: string,
                productName: string,
                productShortDescription: string,
                quantityPurchased: number,
                fixedUSDAmount: number) {
                    this.buyerUserID = buyerUserID,
                    this.senderPublicKey = senderPublicKey,
                    this.sellerUserID = sellerUserID,
                    this.receiverPublicKey = receiverPublicKey,
                    this.assetPurchaseDetails = assetPurchaseDetails,
                    this.memo = memo,

                    this.productID = productID,
                    this.productName = productName,
                    this.productShortDescription = productShortDescription,
                    this.quantityPurchased = quantityPurchased,
                    this.fixedUSDAmount = fixedUSDAmount;
    }

}


export const enum OrderType {
    Purchase = 'Purchase',
    Sale = 'Sale',
    Other = 'Other'
}

export class TransactionPaymentDetails {
    receiverPublicKey: string;
    assetBalance: AssetBalance;
    memo: string;

    constructor(receiverPublicKey: string,
                assetBalance: AssetBalance,
                memo: string) {
                    this.receiverPublicKey = receiverPublicKey;
                    this.assetBalance = assetBalance;
                    this.memo = memo;
                }
}
