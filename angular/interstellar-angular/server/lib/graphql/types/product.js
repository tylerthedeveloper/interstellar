
const schema = `
    input ProductSellerDataInput {
        productSellerID: String
        productSellerName: String
        productSellerPublicKey: String
    }

    type ProductSellerData {
        productSellerID: String
        productSellerName: String
        productSellerPublicKey: String
    }
    
    input ProductInput {
        # id: String
        productName: String
        productShortDescription: String
        productLongDescription: String
        fixedUSDAmount: Int
        quantity: Int
        productPrices: [AssetBalanceInput]
        productAssetOptions: [String]
        productThumbnailLink: String
        productImages: [String]
        productCategory: String
        productSellerData: ProductSellerDataInput
        productListedAt: Int
        # some day
        # productRating: Int
        # productReviews: [String]
        # shippingInfo: ShippingInformation
    }
    
    type Product {
        id: String
        productName: String
        productShortDescription: String
        productLongDescription: String
        fixedUSDAmount: Int
        quantity: Int
        productPrices: [AssetBalance]
        productAssetOptions: [String]
        productThumbnailLink: String
        productImages: [String]
        productCategory: String
        productSellerData: ProductSellerData
        productListedAt: Int
        # some day
        # productRating: Int
        # productReviews: [String]
        # shippingInfo: ShippingInformation
    }

    type Query {
        products: [Product]
        product(id: String!): Product
    }

    type Mutation {
        updateProduct (
            # need to dump all attributes
            someAttr: String
        ): Product
    
        addProduct (
            input: ProductInput
        ): Product
    
        deleteProduct(fbid: String!): Product
    }
    
    type Subscription {
        productUpdated: Product
        productAdded: Product
        productDeleted: Product
    }
`;

module.exports = schema;
