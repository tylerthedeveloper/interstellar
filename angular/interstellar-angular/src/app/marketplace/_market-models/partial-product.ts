import { ProductCategory } from "./product-category";

export class PartialProduct {
    
    id: string;
    itemName: string;
    shortDescription: string;
    publicKey: string;     
    price: number;
    productCategory: ProductCategory
    thumbnailLink: string;
    
}
