export class MarketItem {
    
    productName: string;
    productPrices: Array<ProductPrice>; 
    productSellerName: string;
    productSellerPublicKey: string;
    
    
}

class ProductPrice {
    productCost: number;
    productAssetType: string;
    // asset_type: string;
    // cost: number;
}