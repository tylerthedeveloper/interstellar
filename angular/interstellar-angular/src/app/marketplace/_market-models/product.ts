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

    productListedAt: Date;

    // some day
    productRating: number;
    productReviews: string[];

}

