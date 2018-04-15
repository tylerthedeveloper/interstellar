import { AssetBalance } from '../../stellar';

export class Product {

    // TODO: change to productID
    id: string;
    productName: string;
    productShortDescription: string;
    productLongDescription: string;
    fixedUSDAmount: number;
    quantity: number;
    productPrices: Array<AssetBalance>;

    productThumbnailLink: string;
    productImages: string[];

    //////////////
    productCategory: string; /////////////// ProductCategory
    ////////////

    productSellerData: {
        productSellerID: string;
        productSellerName: string;
        productSellerPublicKey: string;
    };

    // some day
    productRating: number;
    productReviews: string[];

}

export class ShippingInformation {

    shipCost: number;
    shipService: string;
    trackingNumber: string;
    validShipService: boolean;
    isShipped: boolean;

}

