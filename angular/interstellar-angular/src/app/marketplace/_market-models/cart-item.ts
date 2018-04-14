import { AssetBalance } from 'app/stellar';

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
    assetPurchaseDetails: AssetBalance;
    productShortDescription: string;
    productThumbnailLink: string;
    productCategory: string;
    oldQuantity: number;


    fixedUSDAmount: number;
    isInCheckout: boolean;

    constructor(buyerUserID: string,
                buyerPublicKey: string,
                sellerUserID: string,
                sellerPublicKey: string,
                productID: string,
                // orderType: OrderType,
                productName: string,
                quantityPurchased: number,
                fixedUSDAmount: number,
                productThumbnailLink: string,
                productShortDescription: string,
                assetPricePerItem: string,
                assetPurchaseDetails: AssetBalance,
                productCategory: string,
                oldQuantity: number) {
                        this.buyerUserID = buyerUserID,
                        this.buyerPublicKey = buyerPublicKey,
                        this.sellerUserID = sellerUserID,
                        this.sellerPublicKey = sellerPublicKey,
                        this.productID = productID,
                        this.productName = productName,
                        this.quantityPurchased = quantityPurchased,
                        this.productThumbnailLink = productThumbnailLink,
                        this.productShortDescription = productShortDescription,
                        this.fixedUSDAmount = fixedUSDAmount,
                        this.assetPricePerItem = assetPricePerItem,
                        this.assetPurchaseDetails = assetPurchaseDetails;
                        this.isInCheckout = false;

                        this.productCategory = productCategory;
                        this.oldQuantity = oldQuantity;
                }
}
