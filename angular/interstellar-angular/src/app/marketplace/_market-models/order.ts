import { Asset } from 'app/stellar';

export class Order {

    orderID: string;
    timestamp: string;
    orderType: OrderType;

    buyerUserID: string;
    sellerUserID: string;

    productID: string;
    productName: string;
    quantityPurchased: number;
    assetPurchaseDetails: Asset;


    constructor(buyerUserID: string,
                sellerUserID: string,
                productID: string,
                // orderType: OrderType,
                productName: string,
                quantityPurchased: number,
                assetPurchaseDetails: Asset) {
                        this.buyerUserID = buyerUserID,
                        this.sellerUserID = sellerUserID,
                        this.productID = productID,
                        this.productName = productName,
                        this.quantityPurchased = quantityPurchased,
                        this.assetPurchaseDetails = assetPurchaseDetails;
                }
}

export const enum OrderType {
    Purchase = 'Purchase',
    Sale = 'Sale',
    Other = 'Other'
}
