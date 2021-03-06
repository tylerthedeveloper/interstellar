import { AssetBalance } from '../../stellar';
import { ShippingInformation } from './shipping';

export class Product {

    // TODO: change to productID
    id: string;
    productName: string;
    productShortDescription: string;
    productLongDescription: string;
    fixedUSDAmount: number;
    quantity: number;
    productPrices: Array<AssetBalance>;
    productAssetOptions: string[];

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

    productListedAt: number;

    // some day
    productRating: number;
    productReviews: string[];

    //  = new ShippingInformation();
    shippingInfo: ShippingInformation;
}

