import { ProductCategory } from './product-category';
import { AssetBalance } from '../../stellar';

// import { currencyAssetsMapper } from '../../stellar/utils';


export class Product {

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
    validShipService: boolean;
    isShipped: boolean;

}

// export class ProductPrice {
//     productAssetAmount: number;
//     productAssetType: string;
// }



