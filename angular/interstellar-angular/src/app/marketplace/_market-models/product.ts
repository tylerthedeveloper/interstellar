export class Product {
    
    id: string;
    itemName: string;
    description: string;
    publicKey: string;     
    price: number;
    quantity: number;
    productCategory: ProductCategory
    
}

export class ShippingInformation {

    shipCost: number;
    shipService: string;
    validShipService: boolean;
    isShipped: boolean;

}

export class ProductCategory {

    productCategoryEnum: ProductCategoryEnum;
    category: string;
    thumbnailLink: string;
    /////// need to change
    ////
    constructor(category: string,
                thumbnailLink: string) {}
    ///
    ///
};

export const enum ProductCategoryEnum {

    apparel,
    electronics,
    houseware,
    software,

    other

};