export class Product {
    
    userName: string;
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


export const enum ProductCategory {

    apparel,
    electronics,
    houseware,
    software,

    other

};