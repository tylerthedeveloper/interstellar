import { ProductCategory } from "./product-category";

// import { currencyAssetsMapper } from '../../stellar/utils';


export class Product {

    id: string;
    productName: string;
    productShortDescription: string;
    productLongDescription: string;
    price: number;
    quantity: number;
    productPrices: Array<ProductPrice>;

    productImages: string[];
    //////////////
    productCategory: string; ///////////////ProductCategory
    ////////////
    
    productSellerID: string;
    productSellerName: string;
    productSellerPublicKey: string;

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

class ProductPrice {
    productCost: number;
    productAssetType: string;
}



