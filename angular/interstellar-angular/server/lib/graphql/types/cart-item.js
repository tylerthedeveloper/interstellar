const schema = `
    input CartItemInput {
        cartItemID: String!
        timestamp: String!
        buyerUserID: String!
        buyerPublicKey: String!
        sellerUserID: String!
        sellerPublicKey: String!
        productID: String!
        productName: String!
        quantityPurchased: Int!
        assetPricePerItem: String!
        assetPurchaseDetails: AssetBalanceInput!
        productShortDescription: String!
        productThumbnailLink: String!
        productCategory: String!
        oldQuantity: Int!
        fixedUSDAmount: Int!
        selectedAsset: String
        isInCheckout: Boolean
        isPaidFor: Boolean
    }

    type CartItem {
        cartItemID: String!
        timestamp: String!
        buyerUserID: String!
        buyerPublicKey: String!
        sellerUserID: String!
        sellerPublicKey: String!
        productID: String!
        productName: String!
        quantityPurchased: Int!
        assetPricePerItem: String!
        assetPurchaseDetails: AssetBalance!
        productShortDescription: String!
        productThumbnailLink: String!
        productCategory: String!
        oldQuantity: Int!
        fixedUSDAmount: Int!
        selectedAsset: String
        isInCheckout: Boolean
        isPaidFor: Boolean
    }

    type Query {
        cartItems(id: String!): [CartItem]
    }

    type Mutation {
        updateCartItem (
            # need to dump all attributes
            someAttrs: String
        ): CartItem
    
        addToCart (
            input: CartItemInput
        ): CartItem
    
        deleteCartItem(fbid: String!): CartItem
    }
    
    type Subscription {
        cartItemUpdated: CartItem
        cartItemAdded: CartItem
        cartItemDeleted: CartItem
    }
`;

module.exports = schema;
