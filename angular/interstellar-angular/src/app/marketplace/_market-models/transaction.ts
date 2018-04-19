import { AssetBalance } from 'app/stellar';

export class TransactionGroup {

    transactionGroupID: string;
    sellerPublicKey: string;
    timestamp: string;

    transactionRecords: Array<TransactionRecord>;
    transactionPaymentDetails: TransactionPaymentDetails;

    isPaidFor: boolean;

    constructor(sellerPublicKey: string) {
                this.sellerPublicKey = sellerPublicKey;
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
    oldQuantity: number;
    quantityPurchased: number;
    fixedUSDAmount: number;
    productCategory: string;

    orderType: OrderType;

    constructor(
            // trans details //
                transactionID: string,
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
                fixedUSDAmount: number,
                productCategory: string,
                oldQuantity: number) {
                    this.transactionID = transactionID,
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
                    this.fixedUSDAmount = fixedUSDAmount,
                    this.oldQuantity = oldQuantity,
                    this.productCategory = productCategory;
    }

}

export class TransactionPaymentDetails {
    senderPublicKey: string;
    receiverPublicKey: string;
    assetBalance: AssetBalance[];
    memo: string;

    constructor(senderPublicKey: string,
                receiverPublicKey: string,
                assetBalance: AssetBalance[],
                memo: string) {
                    this.senderPublicKey = senderPublicKey;
                    this.receiverPublicKey = receiverPublicKey;
                    this.assetBalance = assetBalance;
                    this.memo = memo;
                }
}

export const enum OrderType {
    'Purchase' = 'Purchase',
    'Sale' = 'Sale'
}