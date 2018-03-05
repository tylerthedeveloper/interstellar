import { ProductCategory } from "./product-category";

export class Product {
    
    id: string;
    itemName: string;
    description: string;
    publicKey: string;     
    price: number;
    quantity: number;
    productCategory: ProductCategory;
    images: string[];
    
}

export class ShippingInformation {

    shipCost: number;
    shipService: string;
    validShipService: boolean;
    isShipped: boolean;

}

