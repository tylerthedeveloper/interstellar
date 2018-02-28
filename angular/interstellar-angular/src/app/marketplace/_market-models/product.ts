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
    description: string;

    constructor(category: string,
                description: string,
                thumbnailLink: string) {
                    
                this.category = category;
                this.description = description;
                this.thumbnailLink = thumbnailLink;
    }
};

export const enum ProductCategoryEnum {

    apparel,
    electronics,
    houseware,
    software,

    other

};