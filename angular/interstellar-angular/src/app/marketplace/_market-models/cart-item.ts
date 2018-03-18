import { Asset } from 'app/stellar';

export class CartItem {

    cartItemID: string;
    timestamp: string;

    buyerUserID: string;
    buyerPublicKey: string;

    sellerUserID: string;
    sellerPublicKey: string;

    productID: string;
    productName: string;
    quantityPurchased: number;
    assetPricePerItem: string;
    assetPurchaseDetails: Asset;


    constructor(buyerUserID: string,
                buyerPublicKey: string,
                sellerUserID: string,
                sellerPublicKey: string,
                productID: string,
                // orderType: OrderType,
                productName: string,
                quantityPurchased: number,
                assetPricePerItem: string,
                assetPurchaseDetails: Asset) {
                        this.buyerUserID = buyerUserID,
                        this.buyerPublicKey = buyerPublicKey,
                        this.sellerUserID = sellerUserID,
                        this.sellerPublicKey = sellerPublicKey,
                        this.productID = productID,
                        this.productName = productName,
                        this.quantityPurchased = quantityPurchased,
                        this.assetPricePerItem = assetPricePerItem,
                        this.assetPurchaseDetails = assetPurchaseDetails;
                }
}
